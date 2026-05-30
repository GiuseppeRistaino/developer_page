---
name: Efficient Flow
colors:
  surface: '#faf9fd'
  surface-dim: '#dad9de'
  surface-bright: '#faf9fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f7'
  surface-container: '#eeedf1'
  surface-container-high: '#e9e7ec'
  surface-container-highest: '#e3e2e6'
  on-surface: '#1a1c1f'
  on-surface-variant: '#414752'
  inverse-surface: '#2f3034'
  inverse-on-surface: '#f1f0f4'
  outline: '#727783'
  outline-variant: '#c1c6d4'
  surface-tint: '#005eb4'
  primary: '#00478c'
  on-primary: '#ffffff'
  primary-container: '#005fb7'
  on-primary-container: '#c9dbff'
  inverse-primary: '#a8c8ff'
  secondary: '#565e71'
  on-secondary: '#ffffff'
  secondary-container: '#dae2f9'
  on-secondary-container: '#5c6478'
  tertiary: '#5d3e58'
  on-tertiary: '#ffffff'
  tertiary-container: '#765570'
  on-tertiary-container: '#f8ceee'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#a8c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#00468a'
  secondary-fixed: '#dae2f9'
  secondary-fixed-dim: '#bec6dc'
  on-secondary-fixed: '#131b2c'
  on-secondary-fixed-variant: '#3f4759'
  tertiary-fixed: '#ffd7f5'
  tertiary-fixed-dim: '#e3bada'
  on-tertiary-fixed: '#2c1229'
  on-tertiary-fixed-variant: '#5b3d56'
  background: '#faf9fd'
  on-background: '#1a1c1f'
  surface-variant: '#e3e2e6'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 57px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.25px
  headline-md:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: '0'
  title-lg:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: '0'
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0.15px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.5px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.25px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.1px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.5px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  margin-mobile: 16px
  gutter-kanban: 12px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
  container-padding: 16px
---

## Brand & Style

This design system centers on a **Corporate / Modern** aesthetic, deeply rooted in Material Design 3 principles but refined for high-density productivity. The brand personality is dependable, logical, and unobtrusive, ensuring the user's data remains the primary focus. 

The visual language utilizes a "Content-First" approach, where structural elements like containers and borders are minimized to reduce cognitive load. The emotional response should be one of "calm control"—a digital environment that feels organized before a single task is entered. The system leverages subtle motion and logical spatial relationships to guide the user through complex project management workflows.

## Colors

The color palette is built on a foundation of "Trust Blue," used for primary actions and brand presence. To support multi-project management, three distinct accent colors (Green, Orange, Purple) are utilized specifically for project categorization and status indicators.

In **Light Mode**, the system uses a high-luminance neutral scale to keep the interface feeling airy. In **Dark Mode**, it shifts to a deep charcoal (rather than pure black) to maintain legibility and reduce eye strain during long planning sessions. Surface tones follow the M3 "Tonal Palette" logic, where color shifts in containers indicate elevation and hierarchy.

## Typography

The design system employs **Inter** for all text levels to ensure maximum readability across various screen densities. 

- **Headlines:** Use a semi-bold weight to create a strong anchor for page titles.
- **Body Text:** Standardized on a 16px base for optimal mobile legibility.
- **Labels:** Utilized for metadata (dates, tags, timestamps) with increased letter spacing to ensure clarity at small sizes.
- **Hierarchy:** Contrast is achieved primarily through weight and color (using on-surface-variant for secondary information) rather than drastic size changes.

## Layout & Spacing

This design system uses a **Fluid Grid** model based on a 4dp base unit. For mobile viewports, a 4-column grid is standard, with 16px outer margins.

The Kanban layout utilizes a horizontal scrolling behavior where columns have a fixed width (280dp-320dp) with 12px gutters, allowing a "peek" at the subsequent column to indicate overflow. Inside cards, a 16px internal padding is standard to prevent content from feeling cramped. Vertical spacing between task cards is set to 8px to maintain a tight, list-like density while still allowing individual element identification.

## Elevation & Depth

The design system adopts **Tonal Layers** as its primary depth indicator, minimizing the use of heavy drop shadows. 

1.  **Level 0 (Base):** The main background surface.
2.  **Level 1 (Cards/Lists):** A slightly lighter (light mode) or darker (dark mode) container tone. This is the primary level for Kanban cards.
3.  **Level 2 (Active/Dragged):** When a card is picked up, it gains a subtle, diffused ambient shadow (10% opacity black, 8px blur) and a slight scale increase (1.02x) to indicate it has been lifted from the board.
4.  **Level 3 (Overlays):** Modals and bottom sheets use a surface-tint overlay to further distinguish them from the workspace.

## Shapes

The shape language follows a **Rounded** philosophy to soften the professional interface and make it feel more accessible. 

- **Task Cards:** 12px corner radius to provide a friendly, distinct boundary.
- **Buttons:** Fully rounded (pill-shaped) for primary actions to distinguish them from structural cards.
- **Input Fields:** 8px corner radius, balancing the "box" feel of a form with the system's overall roundedness.
- **Selection Indicators:** Small indicators (like project color pips) use a 4px radius or perfect circles.

## Components

### Buttons
Primary buttons use the Primary Blue background with white text. Secondary buttons use a tonal surface color or a low-opacity blue tint. Ghost buttons are used for tertiary actions like "Cancel."

### Kanban Cards
The core of the system. Cards must include:
- A top-aligned project accent bar (2px height).
- Title (Title-MD).
- Optional sub-tasks/metadata (Label-SM).
- Avatar stack for assigned members (circular, 24dp).

### Chips & Tags
Used for "Status" or "Priority." These are low-profile (Height: 32dp) with an 8px radius. They use the project-specific accent colors at 15% opacity with high-contrast text for visibility.

### Lists
Standard list items use 56dp height for single line and 72dp for double line, with a thin 1px divider (neutral-variant color) that does not extend to the full edge of the screen.

### Bottom Sheets
The primary method for "Task Creation" or "Filtering." They use a Level 3 elevation and feature a centered drag handle at the top.

### Input Fields
Outlined style with a 1px border. On focus, the border thickens to 2px and changes to Primary Blue, with the label floating to the top-left of the border line.