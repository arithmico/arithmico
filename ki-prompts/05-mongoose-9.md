# Migration prompt: Mongoose 8 → 9

## Context to give the assistant

You are working in the `packages/services/api` workspace of the `arithmico` monorepo. It uses `mongoose` `^8.24.4` together with `@nestjs/mongoose` `^11.0.4` and `mongodb` `^6.21.0` as the underlying driver. This migration is scheduled before the NestJS 12 upgrade so the data layer can be validated independently.

## Task

Upgrade Mongoose from 8 to 9.

1. Read the official Mongoose 9 migration guide. Pay particular attention to: changes to schema strictness defaults, removal of previously deprecated query helpers or options, changes to how `populate()` typing works with TypeScript, changes to connection options, and any change to the minimum supported MongoDB server version or `mongodb` driver version.
2. Check `@nestjs/mongoose`'s `peerDependencies` for the `mongoose` range it supports; upgrade `@nestjs/mongoose` alongside if a newer release is required, but do not jump to the NestJS 12 major as part of this step — stay on the NestJS 11 compatible line if one exists for the new Mongoose version. If no NestJS-11-compatible `@nestjs/mongoose` release supports Mongoose 9, document that as a hard dependency: Mongoose 9 and NestJS 12 (step 7 in the migration roadmap) would need to happen together instead, and flag this back before proceeding.
3. Search `packages/services/api/src` for every schema definition (`@Schema()` decorators, `SchemaFactory.createForClass`), every custom query or aggregation pipeline, and every place using `.populate()`, `.lean()`, or schema-level middleware (`pre`/`post` hooks), and check each against the migration guide's breaking changes list.
4. Verify TypeScript types still compile cleanly; Mongoose has changed its generic typing approach across majors and this is a common source of build breakage independent of runtime behavior.
5. Do not modify test files; if integration tests seed data through Mongoose models, verify the seeding still produces the same documents after the upgrade.

## Validation checklist

- `npm run build -w api` succeeds with no new TypeScript errors.
- `npm run test -w api` passes with the same test count as before.
- Every schema still validates the same required fields, defaults and indexes as before (compare `db.collection.getIndexes()` output or equivalent before/after if the environment allows a real MongoDB connection).
- No deprecation warnings are logged at startup that were not present before.
