# Deploy to GAM

This script will attempt to upload all commercial templates to GAM, replacing the corresponding generated HTML & CSS.

The script checks for the presence of an `ad.json` file in the template directory. By default it uses `testNativeStyleId` from each template's `ad.json`. If you pass `--production`, it uses `nativeStyleId` instead.

[native-style]: https://support.google.com/admanager/answer/13404315?hl=en&ref_topic=7032550&sjid=6297647672569553146-EU

## Requirements

- Node.js (version from `.nvmrc`)
- `pnpm`
- GAM credentials in `scripts/deploy/.env`

## Running locally

```bash
cd <repo-root>/scripts/deploy
cp .env.example .env # fill this in
cd ../..
pnpm install
pnpm build:templates
pnpm deploy:gam:test
```

## Modes

```bash
# Default: deploy using testNativeStyleId
pnpm deploy:gam:test

# Preview test-target styles without updating them
pnpm deploy:gam:test:dry-run

# Deploy using nativeStyleId
pnpm deploy:gam:prod

# Preview production-target styles without updating them
pnpm deploy:gam:prod:dry-run
```

