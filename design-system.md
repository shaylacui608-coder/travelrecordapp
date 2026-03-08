# Travel Record App — Design System

## Overview

A warm, adventure-forward travel expense tracker. The visual language uses earthy golden-brown tones inspired by Egyptian sand and antiquity, paired with creamy off-whites. 3D illustrations give the app a playful, tactile feel.

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `background` | `#F5EFE0` | Page backgrounds, summary screen |
| `cardBrown` | `#7B5E2A` | Question card backgrounds |
| `buttonBrown` | `#5C3D00` | Primary buttons, bottom tab bar |
| `inputBg` | `#EDE4D0` | Input fields on cards, search bar |
| `textOnCard` | `#FFFFFF` | Question text on brown cards |
| `textDark` | `#2C2C2C` | Body text on light backgrounds |
| `textMuted` | `#8C7B6B` | Subtext, "You have spend" label |
| `goldAccent` | `#E8B84B` | Coin icon tint, highlights |
| `chipActive` | `#5C3D00` | Selected filter chip background |
| `chipInactiveBg` | `#EDE4D0` | Unselected filter chip background |
| `chipActiveText` | `#FFFFFF` | Text on active chip |
| `chipInactiveText`| `#5C3D00` | Text on inactive chip |
| `cardBorder` | `#C4A882` | Partner card selected border |
| `white` | `#FFFFFF` | Pure white |

---

## Typography

**Font Family:** Plus Jakarta Sans (all weights via `@expo-google-fonts/plus-jakarta-sans`)

| Style | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `display` | 32px | 800 (ExtraBold) | 40px | Summary total amount |
| `h1` | 24px | 700 (Bold) | 32px | Question card text |
| `h2` | 20px | 700 (Bold) | 28px | Section headers |
| `h3` | 18px | 600 (SemiBold) | 26px | Card destination name |
| `body` | 16px | 500 (Medium) | 24px | General text, greeting |
| `caption` | 14px | 400 (Regular) | 20px | Skip link, muted labels |
| `label` | 13px | 600 (SemiBold) | 18px | Filter chips, partner labels |
| `inputText` | 20px | 600 (SemiBold) | 28px | Expense input value |
| `coinCounter` | 16px | 700 (Bold) | 22px | Coin total in header |

---

## Spacing Scale

```
xs:  4px
sm:  8px
md:  12px
base: 16px
lg:  24px
xl:  32px
2xl: 48px
3xl: 64px
```

---

## Border Radius

| Name | Value | Usage |
|---|---|---|
| `sm` | 8px | Partner cards inner |
| `md` | 16px | Trip cards, question cards |
| `lg` | 24px | Filter chips |
| `xl` | 32px | Buttons, input fields |
| `full` | 9999px | Avatar circle, pill shapes |

---

## Component Patterns

### Question Card
- Full-screen rounded card (`borderRadius: 28px`, `mx: 16px`)
- Background: `cardBrown` (#7B5E2A)
- Illustration: centered in top 55% of card, `resizeMode: contain`
- Question text: `h1`, `textOnCard`, positioned in lower section
- Input pill: `inputBg` background, `$` prefix in `textMuted`, amount in `inputText`
- **Next button**: `buttonBrown` background, `white` text, full-width pill, `height: 56px`
- **Skip link**: `caption` style, `textOnCard` (semi-transparent), centered below button

### Partner Card (Q0 grid item)
- Background: `#EDE4D0` (light cream)
- Border: 2px solid transparent (selected: `cardBorder`)
- Border radius: `md` (16px)
- Character image: fills top 70% of card
- Label: `label` style, `textDark`, centered below image
- Grid: 2 columns, equal width, `gap: 12px`

### Trip Card (homepage)
- Full-width card, `height: 200px`, `borderRadius: md`
- Image fills card (`resizeMode: cover`)
- Linear gradient overlay (bottom 50%): `transparent → rgba(0,0,0,0.6)`
- Destination name: `h3`, `white`, bottom-left `padding: 16px`

### Search Bar
- Background: `inputBg`
- Border radius: `full`
- Height: 48px
- Padding horizontal: 16px
- Search icon left side, `textMuted` placeholder

### Filter Chip
- Horizontal scroll row, `gap: 8px`
- Active: `chipActive` bg, `chipActiveText` text
- Inactive: `chipInactiveBg` bg, `chipInactiveText` text
- Border radius: `lg` (24px), padding: `8px 16px`

### Primary Button
- Background: `buttonBrown`
- Border radius: `xl` (32px)
- Height: 56px
- Text: `body`, weight 700, `white`
- Full-width with `mx: 16px` margin

### Bottom Tab Bar
- Background: `buttonBrown`
- Border radius top: 20px
- Icon size: 24px (using `icon1–4.png`)
- Active icon tinted `white`, inactive `rgba(255,255,255,0.5)`

### Coin Counter (header right)
- `coin.png` at 24×24
- Amount text: `coinCounter`, `textDark` (or `white` on brown card)
- Displayed top-right of question flow screens

---

## Animation Specs

### Card Swipe (Bumble-style)
- Gesture: PanGestureHandler (react-native-gesture-handler)
- Threshold to commit swipe: `translateX < -80px`
- Exit animation: spring to `x: -screenWidth * 1.5`, rotate `-15deg`
- Entry animation: slide in from `x: screenWidth * 0.3`, fade in
- Duration: `~300ms` spring (damping 20, stiffness 90)

### Button Press
- Scale: `0.97` on press (useAnimatedStyle)
- Duration: 100ms

### Coin Counter
- Animated number increment when expense is added
- Uses Animated.timing, 200ms ease-out

---

## Illustrations

All illustrations are 3D-rendered PNGs on transparent/white backgrounds.
They should be displayed at `contain` resize mode to preserve aspect ratio.
Approximate display size: `width: 100%, height: 200–240px`.

| Question | Illustration | File |
|---|---|---|
| Who went with? | 3D characters (2×2 grid) | `person1–4.png` |
| Flight tickets | Boarding pass | `question_1.png` |
| Food | Dining table setup | `question_2.png` |
| Hotel | Isometric hotel room | `question_3.png` |
| Souvenirs | Egyptian pottery | `question_4.png` |
| Traffic | Felucca sailboat | `question_5.png` |
| Exciting experience | Colorful hot air balloon | `question_6.png` |
| Attractions | Egyptian temple model | `question_7.png` |
| Homepage Egypt | Stone archway | `homepagpic_1.png` |
| Homepage Egypt | Orange hot air balloon | `homepagepic_2.png` |
| Homepage Egypt | Desert/ruins scene | `homepagepic_3.png` |
| Coin / Total | Gold coin | `coin.png` |

---

## Screen Layout Structure

### HomeScreen
```
SafeAreaView (background: #F5EFE0)
  ├── Header row: Avatar + "welcome back, shayla"
  ├── SearchBar
  ├── FilterChips (ScrollView horizontal)
  ├── "Recent Trips" section header
  ├── TripCard list (ScrollView vertical)
  └── BottomTabBar (absolute bottom)
```

### QuestionFlowScreen
```
View (background: #F5EFE0)
  ├── Header: BackArrow (left) + CoinCounter (right)
  ├── QuestionCard (animated, fills remaining space)
  │    ├── Illustration (top 55%)
  │    ├── Question text
  │    ├── Input pill (or partner grid)
  │    ├── Next button
  │    └── skip link
  └── (progress implied by coin counter growing)
```

### SummaryScreen
```
SafeAreaView (background: #F5EFE0)
  ├── BackArrow (top left)
  ├── [centered content]
  │    ├── coin.png (120×120)
  │    ├── "You have spent" (textMuted, caption)
  │    └── "$ {total}" (display, textDark)
  └── "back to homepage" button (absolute bottom)
```
