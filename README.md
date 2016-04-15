# monies

> A little command line application for [Mondo](https://www.getmondo.co.uk)

## Installation

```
npm install --global monies
```

## Usage

Get a sample access token from the [Mondo Developer Portal](https://developers.getmondo.co.uk), then export it:

```
export MONDO_TOKEN=...
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

> To reduce wear on your keyboard, _monies_ is also installed as the `£` command.
