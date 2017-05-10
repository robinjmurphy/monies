# monies

> A little command line application for [Monzo](https://monzo.com/)

## Installation

```
npm install --global monies
```

## Usage

Get a sample access token from the [Monzo Developer Portal](https://developers.monzo.com), then export it:

```
export MONZO_TOKEN=...
```

(Proper authentication is coming soon!)

You can then see how much money you've got using the `monies` command:

```bash
monies
# £18.54
```

And check your recent transactions:

```bash
monies recent
# -£13.45 🐔 Nando's 16 hours ago
```

`recent` takes an optional argument of days:
```bash
monies recent [days]
```
```bash
monies recent 2
# -£13.45 🐔 Nando's 16 hours ago
# -£31.00 ☕️ Source 2 days ago
```

> To reduce wear on your keyboard, _monies_ is also installed as the `£` command.
