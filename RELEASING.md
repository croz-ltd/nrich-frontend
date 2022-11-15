# Releasing modules

`nrich-frontend` uses [Changesets](https://github.com/changesets/changesets) to do versioning. This makes releasing really easy and changelogs are automatically generated.

## How to do a release

1. Run `yarn install` to make sure everything is up-to-date.
2. Run `yarn version-packages`.
3. Run `NPM_CONFIG_OTP=<code> yarn release`. `<code>` should be replaced with your NPM OTP code.
