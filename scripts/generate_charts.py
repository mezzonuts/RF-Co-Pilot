#!/usr/bin/env python3
"""
RF-Co-Pilot Benchmark Chart Generator
======================================
Generates PNG charts from speedtest/webtest/videotest CSV data.

Usage:
  python scripts/generate_charts.py tests/benchmark_data/ --output reports/charts/
"""

import argparse
import os
import sys

import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')  # Non-interactive backend
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

# ── Style ──
plt.rcParams.update({
    'figure.facecolor': '#1e1b2e',
    'axes.facecolor': '#1e1b2e',
    'axes.edgecolor': '#4a4458',
    'axes.labelcolor': '#e2e0e7',
    'text.color': '#e2e0e7',
    'xtick.color': '#9896a3',
    'ytick.color': '#9896a3',
    'grid.color': '#2d2a3e',
    'grid.alpha': 0.5,
    'font.size': 11,
    'axes.titlesize': 14,
    'axes.titleweight': 'bold',
})

COLORS = {
    'Telkomsel': '#ff6b35',
    'Indosat': '#4ecdc4',
    'XL Smart': '#45b7d1',
    'Smartfren': '#96ceb4',
    'Hutchison': '#ffeaa7',
}

MNC_MAP = {'10': 'Telkomsel', '01': 'Indosat', '11': 'XL Smart', '28': 'Smartfren', '89': 'Hutchison'}


def classify_isp(row):
    mnc = str(row.get('MNC', '')).strip().zfill(2)
    if mnc in MNC_MAP:
        return MNC_MAP[mnc]
    isp = str(row.get('ISP', '')).lower()
    if 'telkomsel' in isp: return 'Telkomsel'
    if 'indosat' in isp: return 'Indosat'
    if 'xl' in isp: return 'XL Smart'
    if 'smartfren' in isp: return 'Smartfren'
    return 'Other'


def load_and_enrich(path, test_type):
    df = pd.read_csv(path, low_memory=False, dtype=str)
    df['ISP_Class'] = df.apply(classify_isp, axis=1)

    num_cols = {
        'speedtest': ['DL', 'UL', 'PING', 'JITTER', 'Signal Strength', 'RSRP', 'SINR'],
        'webtest': ['Throughput', 'Loading Time', 'RSRP', 'SINR'],
        'videotest': ['Throughput', 'Up Throughput', 'Initial Buffering', 'Re Buffering', 'RSRP', 'SINR'],
    }
    for col in num_cols.get(test_type, []):
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce')
    return df


def chart_speedtest_bar(df, out_dir):
    """Bar chart: DL/UL avg per ISP."""
    isps = ['Telkomsel', 'Indosat', 'XL Smart']
    dl_avg = [df[df['ISP_Class']==i]['DL'].mean() for i in isps]
    ul_avg = [df[df['ISP_Class']==i]['UL'].mean() for i in isps]

    fig, ax = plt.subplots(figsize=(10, 6))
    x = np.arange(len(isps))
    w = 0.35
    bars1 = ax.bar(x - w/2, dl_avg, w, label='Download', color=[COLORS[i] for i in isps], alpha=0.9)
    bars2 = ax.bar(x + w/2, ul_avg, w, label='Upload', color=[COLORS[i] for i in isps], alpha=0.5)

    ax.set_ylabel('Throughput (Mbps)')
    ax.set_title('Speedtest — Average DL/UL per ISP')
    ax.set_xticks(x)
    ax.set_xticklabels(isps)
    ax.legend()
    ax.grid(axis='y', alpha=0.3)

    for bar in bars1:
        ax.text(bar.get_x() + bar.get_width()/2., bar.get_height() + 1,
                f'{bar.get_height():.1f}', ha='center', va='bottom', fontsize=10, color='#e2e0e7')

    plt.tight_layout()
    path = os.path.join(out_dir, 'speedtest_dl_ul_per_isp.png')
    fig.savefig(path, dpi=150, bbox_inches='tight')
    plt.close(fig)
    return path


def chart_speedtest_distribution(df, out_dir):
    """Box plot: DL distribution per ISP."""
    isps = ['Telkomsel', 'Indosat', 'XL Smart']
    data = [df[df['ISP_Class']==i]['DL'].dropna().values for i in isps]

    fig, ax = plt.subplots(figsize=(10, 6))
    bp = ax.boxplot(data, label=isps, patch_artist=True, showfliers=True,
                    flierprops=dict(marker='o', markersize=3, alpha=0.3))
    for patch, isp in zip(bp['boxes'], isps):
        patch.set_facecolor(COLORS.get(isp, '#666'))
        patch.set_alpha(0.7)

    ax.set_ylabel('DL Throughput (Mbps)')
    ax.set_title('Speedtest — DL Distribution per ISP')
    ax.grid(axis='y', alpha=0.3)

    plt.tight_layout()
    path = os.path.join(out_dir, 'speedtest_dl_distribution.png')
    fig.savefig(path, dpi=150, bbox_inches='tight')
    plt.close(fig)
    return path


def chart_ping_comparison(df, out_dir):
    """Bar chart: PING avg per ISP."""
    isps = ['Telkomsel', 'Indosat', 'XL Smart']
    ping_avg = [df[df['ISP_Class']==i]['PING'].mean() for i in isps]

    fig, ax = plt.subplots(figsize=(8, 5))
    bars = ax.barh(isps, ping_avg, color=[COLORS[i] for i in isps], height=0.5, alpha=0.85)

    ax.set_xlabel('PING (ms)')
    ax.set_title('Speedtest — Average Latency per ISP')
    ax.grid(axis='x', alpha=0.3)
    ax.invert_yaxis()

    for bar in bars:
        ax.text(bar.get_width() + 0.5, bar.get_y() + bar.get_height()/2.,
                f'{bar.get_width():.0f} ms', ha='left', va='center', fontsize=10, color='#e2e0e7')

    plt.tight_layout()
    path = os.path.join(out_dir, 'speedtest_ping_per_isp.png')
    fig.savefig(path, dpi=150, bbox_inches='tight')
    plt.close(fig)
    return path


def chart_webtest_video(df_web, df_vid, out_dir):
    """Combined: Webtest throughput + Videotest buffering per ISP."""
    isps = ['Telkomsel', 'Indosat', 'XL Smart']

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))

    # Webtest
    web_avg = [df_web[df_web['ISP_Class']==i]['Throughput'].mean() for i in isps]
    bars1 = ax1.bar(isps, web_avg, color=[COLORS[i] for i in isps], alpha=0.85)
    ax1.set_ylabel('Throughput (Mbps)')
    ax1.set_title('Webtest — Avg Throughput per ISP')
    ax1.grid(axis='y', alpha=0.3)
    for bar in bars1:
        ax1.text(bar.get_x() + bar.get_width()/2., bar.get_height() + 0.1,
                f'{bar.get_height():.2f}', ha='center', va='bottom', fontsize=10, color='#e2e0e7')

    # Videotest buffering
    vid_buf = [df_vid[df_vid['ISP_Class']==i]['Initial Buffering'].mean() for i in isps]
    bars2 = ax2.bar(isps, vid_buf, color=[COLORS[i] for i in isps], alpha=0.85)
    ax2.set_ylabel('Initial Buffering (ms)')
    ax2.set_title('Videotest — Avg Buffering per ISP')
    ax2.grid(axis='y', alpha=0.3)
    for bar in bars2:
        ax2.text(bar.get_x() + bar.get_width()/2., bar.get_height() + 10,
                f'{bar.get_height():.0f}', ha='center', va='bottom', fontsize=10, color='#e2e0e7')

    plt.tight_layout()
    path = os.path.join(out_dir, 'webtest_videotest_combined.png')
    fig.savefig(path, dpi=150, bbox_inches='tight')
    plt.close(fig)
    return path


def chart_rsrp_signal(df, out_dir):
    """RSRP distribution per ISP."""
    isps = ['Telkomsel', 'Indosat', 'XL Smart']

    fig, ax = plt.subplots(figsize=(10, 6))
    for isp in isps:
        data = df[df['ISP_Class']==isp]['RSRP'].dropna()
        if len(data) > 0:
            ax.hist(data, bins=30, alpha=0.5, label=isp, color=COLORS.get(isp, '#666'))

    ax.axvline(x=-100, color='#ff4444', linestyle='--', alpha=0.7, label='RSRP Threshold (-100 dBm)')
    ax.set_xlabel('RSRP (dBm)')
    ax.set_ylabel('Count')
    ax.set_title('RSRP Distribution per ISP')
    ax.legend()
    ax.grid(axis='y', alpha=0.3)

    plt.tight_layout()
    path = os.path.join(out_dir, 'rsrp_distribution.png')
    fig.savefig(path, dpi=150, bbox_inches='tight')
    plt.close(fig)
    return path


def chart_poi_ranking(df, out_dir):
    """Top 10 POI by avg DL throughput."""
    poi_avg = df.groupby('Group')['DL'].mean().sort_values(ascending=True).tail(10)

    fig, ax = plt.subplots(figsize=(10, 7))
    colors = ['#ff6b35' if v >= 50 else '#45b7d1' if v >= 30 else '#ff4444' for v in poi_avg.values]
    bars = ax.barh(range(len(poi_avg)), poi_avg.values, color=colors, height=0.6)
    ax.set_yticks(range(len(poi_avg)))
    ax.set_yticklabels([g.split(' - @')[-1] if ' - @' in g else g[:30] for g in poi_avg.index], fontsize=9)
    ax.set_xlabel('Avg DL Throughput (Mbps)')
    ax.set_title('Top 10 POI — Speedtest DL Ranking')
    ax.grid(axis='x', alpha=0.3)

    for bar in bars:
        ax.text(bar.get_width() + 0.5, bar.get_y() + bar.get_height()/2.,
                f'{bar.get_width():.1f}', ha='left', va='center', fontsize=9, color='#e2e0e7')

    plt.tight_layout()
    path = os.path.join(out_dir, 'poi_speedtest_ranking.png')
    fig.savefig(path, dpi=150, bbox_inches='tight')
    plt.close(fig)
    return path


def generate_all_charts(data_dir, out_dir):
    os.makedirs(out_dir, exist_ok=True)

    print("[charts] Loading CSVs...")
    speed = load_and_enrich(os.path.join(data_dir, 'speedtest.csv'), 'speedtest')
    web = load_and_enrich(os.path.join(data_dir, 'webtest.csv'), 'webtest')
    video = load_and_enrich(os.path.join(data_dir, 'videotest.csv'), 'videotest')

    charts = []
    print("[charts] Generating charts...")

    charts.append(chart_speedtest_bar(speed, out_dir))
    print(f"  ✓ {charts[-1]}")

    charts.append(chart_speedtest_distribution(speed, out_dir))
    print(f"  ✓ {charts[-1]}")

    charts.append(chart_ping_comparison(speed, out_dir))
    print(f"  ✓ {charts[-1]}")

    charts.append(chart_webtest_video(web, video, out_dir))
    print(f"  ✓ {charts[-1]}")

    charts.append(chart_rsrp_signal(speed, out_dir))
    print(f"  ✓ {charts[-1]}")

    charts.append(chart_poi_ranking(speed, out_dir))
    print(f"  ✓ {charts[-1]}")

    print(f"\n[charts] ✅ {len(charts)} charts generated in {out_dir}")
    return charts


def main():
    parser = argparse.ArgumentParser(description='RF-Co-Pilot Benchmark Chart Generator')
    parser.add_argument('data_dir', help='Directory containing speedtest.csv, webtest.csv, videotest.csv')
    parser.add_argument('--output', '-o', default='reports/charts', help='Output directory for PNG charts')
    args = parser.parse_args()

    if not os.path.isdir(args.data_dir):
        print(f"Error: {args.data_dir} not found")
        sys.exit(1)

    generate_all_charts(args.data_dir, args.output)


if __name__ == '__main__':
    main()
