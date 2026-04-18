import {
  LayoutDashboard,
  BarChart2,
  FileText,
  Users,
  Settings,
  FolderOpen,
} from 'lucide-react';
import type { ChartConfig } from '@/components/ui/chart';

export const revenueData = [
  { month: 'Jan', revenue: 12400, expenses: 7800 },
  { month: 'Feb', revenue: 15200, expenses: 9100 },
  { month: 'Mar', revenue: 14100, expenses: 8400 },
  { month: 'Apr', revenue: 18600, expenses: 10200 },
  { month: 'May', revenue: 21300, expenses: 11800 },
  { month: 'Jun', revenue: 19800, expenses: 10600 },
];

export const sessionData = [
  { day: 'Mon', direct: 380, organic: 290 },
  { day: 'Tue', direct: 520, organic: 410 },
  { day: 'Wed', direct: 340, organic: 260 },
  { day: 'Thu', direct: 610, organic: 490 },
  { day: 'Fri', direct: 680, organic: 540 },
  { day: 'Sat', direct: 210, organic: 180 },
  { day: 'Sun', direct: 160, organic: 140 },
];

export const revenueChartConfig: ChartConfig = {
  revenue: { label: 'Revenue', color: 'var(--chart-1)' },
  expenses: { label: 'Expenses', color: 'var(--chart-2)' },
};

export const sessionChartConfig: ChartConfig = {
  direct: { label: 'Direct', color: 'var(--chart-3)' },
  organic: { label: 'Organic', color: 'var(--chart-4)' },
};

export const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: BarChart2, label: 'Analytics' },
  { icon: FileText, label: 'Reports' },
  { icon: Users, label: 'Users' },
  { icon: FolderOpen, label: 'Projects' },
  { icon: Settings, label: 'Settings' },
];

export const activityItems = [
  { user: 'Alice Brown', action: 'Created report Q2-2026', time: '2m ago' },
  { user: 'Bob Carter', action: 'Updated user permissions', time: '14m ago' },
  { user: 'Carol Davis', action: 'Deleted 3 archived records', time: '1h ago' },
  { user: 'John Doe', action: 'Deployed v2.4.1 to production', time: '3h ago' },
  { user: 'Eve Foster', action: 'Merged pull request #482', time: '5h ago' },
];

export const healthMetrics = [
  { label: 'Sprint completion', value: 78 },
  { label: 'Bug resolution rate', value: 91 },
  { label: 'Test coverage', value: 64 },
  { label: 'Deployment success', value: 97 },
];

export const buildStatuses = [
  { label: 'Build', status: 'passing', color: 'text-chart-2' },
  { label: 'Tests', status: 'failing', color: 'text-destructive' },
  { label: 'Deploy', status: 'pending', color: 'text-muted-foreground' },
  { label: 'Security', status: 'passing', color: 'text-chart-2' },
];
