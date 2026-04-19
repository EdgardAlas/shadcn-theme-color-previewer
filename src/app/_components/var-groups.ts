import type { ThemeVars } from '@/types/theme';

export type VarGroup = {
  label: string;
  vars: { key: keyof ThemeVars; isRadius?: boolean; description?: string }[];
};

export const VAR_GROUPS: VarGroup[] = [
  {
    label: 'Base',
    vars: [
      {
        key: 'background',
        description: 'Main page background, entire app canvas',
      },
      { key: 'foreground', description: 'Default text color and icons' },
      { key: 'border', description: 'Card edges, table rows, dividers' },
      { key: 'input', description: 'Text input and select field borders' },
      {
        key: 'ring',
        description: 'Focus ring on buttons, inputs, interactive elements',
      },
    ],
  },
  {
    label: 'Card',
    vars: [
      { key: 'card', description: 'Stat card backgrounds, content panels' },
      { key: 'card-foreground', description: 'Text inside cards and panels' },
    ],
  },
  {
    label: 'Popover',
    vars: [
      {
        key: 'popover',
        description: 'Dropdown menus, select popups, sheet panels',
      },
      {
        key: 'popover-foreground',
        description: 'Text in dropdowns and sheet panels',
      },
    ],
  },
  {
    label: 'Primary',
    vars: [
      {
        key: 'primary',
        description: 'Primary action buttons, active indicators',
      },
      { key: 'primary-foreground', description: 'Text on primary buttons' },
    ],
  },
  {
    label: 'Secondary',
    vars: [
      { key: 'secondary', description: 'Secondary buttons, outlined badges' },
      { key: 'secondary-foreground', description: 'Text on secondary buttons' },
    ],
  },
  {
    label: 'Muted',
    vars: [
      {
        key: 'muted',
        description: 'Subtle section backgrounds, skeleton loaders',
      },
      {
        key: 'muted-foreground',
        description: 'Labels, metadata, captions, placeholder text',
      },
    ],
  },
  {
    label: 'Accent',
    vars: [
      { key: 'accent', description: 'Menu item hover/focus highlight' },
      {
        key: 'accent-foreground',
        description: 'Text on highlighted menu items',
      },
    ],
  },
  {
    label: 'Destructive',
    vars: [
      {
        key: 'destructive',
        description: 'Delete buttons, error states, warnings',
      },
      {
        key: 'destructive-foreground',
        description: 'Text on destructive elements',
      },
    ],
  },
  {
    label: 'Charts',
    vars: [
      { key: 'chart-1', description: 'Bar chart primary series' },
      { key: 'chart-2', description: 'Bar chart secondary series' },
      { key: 'chart-3', description: 'Area chart fill' },
      { key: 'chart-4', description: 'Line chart stroke' },
      { key: 'chart-5', description: 'Donut chart accent segment' },
    ],
  },
  {
    label: 'Radius',
    vars: [
      {
        key: 'radius',
        isRadius: true,
        description: 'Border radius on cards, buttons, inputs',
      },
    ],
  },
  {
    label: 'Sidebar',
    vars: [
      { key: 'sidebar', description: 'Sidebar panel background' },
      { key: 'sidebar-foreground', description: 'Sidebar nav text and icons' },
      {
        key: 'sidebar-primary',
        description: 'Active nav item background in sidebar',
      },
      {
        key: 'sidebar-primary-foreground',
        description: 'Text on active sidebar nav item',
      },
      { key: 'sidebar-accent', description: 'Sidebar nav item hover state' },
      {
        key: 'sidebar-accent-foreground',
        description: 'Text on hovered sidebar items',
      },
      { key: 'sidebar-border', description: 'Sidebar divider line' },
      { key: 'sidebar-ring', description: 'Focus ring inside sidebar' },
    ],
  },
];
