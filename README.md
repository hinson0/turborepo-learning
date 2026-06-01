```bash
pm build

> my-monorepo@ build /Users/a114514/turborepo_learning
> turbo run build

• turbo 2.9.16

   • Packages in scope: @repo/shared, @repo/web
   • Running build in 2 packages
   • Remote caching disabled

@repo/shared:build: cache hit, replaying logs 8eceb777d6f1f212
@repo/shared:build:
@repo/shared:build:
@repo/shared:build: > @repo/shared@0.0.0 build /Users/a114514/turborepo_learning/packages/shared
@repo/shared:build: > tsc
@repo/shared:build:
@repo/web:build: cache hit, replaying logs fabfe64cdcfbccb7
@repo/web:build:
@repo/web:build:
@repo/web:build: > @repo/web@0.0.0 build /Users/a114514/turborepo_learning/apps/web
@repo/web:build: > tsc
@repo/web:build:

 Tasks:    2 successful, 2 total
Cached:    2 cached, 2 total
  Time:    20ms >>> FULL TURBO


```
