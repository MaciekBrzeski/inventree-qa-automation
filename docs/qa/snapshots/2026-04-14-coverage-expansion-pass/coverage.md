# api-ui-gap coverage report

Generated: 2026-04-14T15:01:44.622Z

## Summary

- OpenAPI endpoints in scope: **83**
- Covered by at least one UI test: **37**
- Uncovered: **46**
- Dead (requests observed but not in OpenAPI): **28**
- Coverage ratio: **44.6%**

## Covered endpoints

| endpoint | hitting tests |
|---|---|
| `DELETE /api/bom/` | 1 |
| `DELETE /api/part/category/{id}/` | 2 |
| `DELETE /api/part/related/{id}/` | 1 |
| `DELETE /api/part/sale-price/{id}/` | 1 |
| `DELETE /api/part/test-template/{id}/` | 1 |
| `DELETE /api/part/{id}/` | 2 |
| `GET /api/bom/` | 9 |
| `GET /api/bom/{id}/` | 1 |
| `GET /api/part/` | 8 |
| `GET /api/part/category/` | 4 |
| `GET /api/part/category/tree/` | 1 |
| `GET /api/part/category/{id}/` | 32 |
| `GET /api/part/related/` | 5 |
| `GET /api/part/related/{id}/` | 1 |
| `GET /api/part/sale-price/` | 4 |
| `GET /api/part/sale-price/{id}/` | 1 |
| `GET /api/part/test-template/` | 5 |
| `GET /api/part/test-template/{id}/` | 1 |
| `GET /api/part/{id}/` | 54 |
| `GET /api/part/{id}/bom-validate/` | 9 |
| `GET /api/part/{id}/pricing/` | 5 |
| `GET /api/part/{id}/requirements/` | 54 |
| `GET /api/part/{id}/serial-numbers/` | 54 |
| `PATCH /api/bom/{id}/` | 1 |
| `PATCH /api/bom/{id}/validate/` | 1 |
| `PATCH /api/part/category/{id}/` | 2 |
| `PATCH /api/part/related/{id}/` | 1 |
| `PATCH /api/part/sale-price/{id}/` | 1 |
| `PATCH /api/part/test-template/{id}/` | 1 |
| `PATCH /api/part/{id}/` | 11 |
| `POST /api/bom/` | 1 |
| `POST /api/bom/substitute/` | 1 |
| `POST /api/part/` | 3 |
| `POST /api/part/category/` | 2 |
| `POST /api/part/related/` | 1 |
| `POST /api/part/sale-price/` | 1 |
| `POST /api/part/test-template/` | 1 |

## Uncovered endpoints + suggested seeds

| endpoint | suggested ui-explore seed |
|---|---|
| `DELETE /api/bom/substitute/{id}/` | /web/part/<assembly-pk> → BOM tab |
| `DELETE /api/bom/{id}/` | /web/part/<assembly-pk> → BOM tab |
| `DELETE /api/part/category/parameters/{id}/` | /web/partcategory/<pk> |
| `DELETE /api/part/internal-price/{id}/` | /web/part/<pk> → Part Pricing tab |
| `DELETE /api/part/stocktake/` | /web/part/<pk> → Stock → Stocktake |
| `DELETE /api/part/stocktake/{id}/` | /web/part/<pk> → Stock → Stocktake |
| `GET /api/bom/substitute/` | /web/part/<assembly-pk> → BOM tab |
| `GET /api/bom/substitute/{id}/` | /web/part/<assembly-pk> → BOM tab |
| `GET /api/part/category/parameters/` | /web/partcategory/<pk> |
| `GET /api/part/category/parameters/{id}/` | /web/partcategory/<pk> |
| `GET /api/part/internal-price/` | /web/part/<pk> → Part Pricing tab |
| `GET /api/part/internal-price/{id}/` | /web/part/<pk> → Part Pricing tab |
| `GET /api/part/stocktake/` | /web/part/<pk> → Stock → Stocktake |
| `GET /api/part/stocktake/{id}/` | /web/part/<pk> → Stock → Stocktake |
| `GET /api/part/thumbs/` | /web/part/<pk> → image upload |
| `GET /api/part/thumbs/{id}/` | /web/part/<pk> → image upload |
| `PATCH /api/bom/substitute/{id}/` | /web/part/<assembly-pk> → BOM tab |
| `PATCH /api/part/` | /web/part or /web/part/<pk> |
| `PATCH /api/part/category/` | /web/partcategory/<pk> |
| `PATCH /api/part/category/parameters/{id}/` | /web/partcategory/<pk> |
| `PATCH /api/part/internal-price/{id}/` | /web/part/<pk> → Part Pricing tab |
| `PATCH /api/part/stocktake/{id}/` | /web/part/<pk> → Stock → Stocktake |
| `PATCH /api/part/thumbs/{id}/` | /web/part/<pk> → image upload |
| `PATCH /api/part/{id}/bom-validate/` | /web/part or /web/part/<pk> |
| `PATCH /api/part/{id}/pricing/` | /web/part or /web/part/<pk> |
| `POST /api/part/category/parameters/` | /web/partcategory/<pk> |
| `POST /api/part/internal-price/` | /web/part/<pk> → Part Pricing tab |
| `POST /api/part/stocktake/` | /web/part/<pk> → Stock → Stocktake |
| `POST /api/part/stocktake/generate/` | /web/part/<pk> → Stock → Stocktake |
| `POST /api/part/{id}/bom-copy/` | /web/part or /web/part/<pk> |
| `PUT /api/bom/substitute/{id}/` | /web/part/<assembly-pk> → BOM tab |
| `PUT /api/bom/{id}/` | /web/part/<assembly-pk> → BOM tab |
| `PUT /api/bom/{id}/validate/` | /web/part/<assembly-pk> → BOM tab |
| `PUT /api/part/` | /web/part or /web/part/<pk> |
| `PUT /api/part/category/` | /web/partcategory/<pk> |
| `PUT /api/part/category/parameters/{id}/` | /web/partcategory/<pk> |
| `PUT /api/part/category/{id}/` | /web/partcategory/<pk> |
| `PUT /api/part/internal-price/{id}/` | /web/part/<pk> → Part Pricing tab |
| `PUT /api/part/related/{id}/` | /web/part/<pk> → Related Parts tab |
| `PUT /api/part/sale-price/{id}/` | /web/part/<pk> → Part Pricing tab |
| `PUT /api/part/stocktake/{id}/` | /web/part/<pk> → Stock → Stocktake |
| `PUT /api/part/test-template/{id}/` | /web/part/<pk> → Test templates tab |
| `PUT /api/part/thumbs/{id}/` | /web/part/<pk> → image upload |
| `PUT /api/part/{id}/` | /web/part or /web/part/<pk> |
| `PUT /api/part/{id}/bom-validate/` | /web/part or /web/part/<pk> |
| `PUT /api/part/{id}/pricing/` | /web/part or /web/part/<pk> |

## Dead endpoints (observed in UI traffic but not in OpenAPI)

These are candidates for bug report: the OpenAPI schema is out of date.

- `GET /api/`
- `GET /api/attachment/`
- `GET /api/auth/v1/auth/session/`
- `GET /api/auth/v1/config/`
- `GET /api/company/part/`
- `GET /api/company/part/manufacturer/`
- `GET /api/generic/status/`
- `GET /api/icons/`
- `GET /api/news/`
- `GET /api/notifications/`
- `GET /api/order/po-line/`
- `GET /api/order/so-line/`
- `GET /api/parameter/`
- `GET /api/parameter/template/`
- `GET /api/plugins/`
- `GET /api/settings/global/`
- `GET /api/settings/user/`
- `GET /api/stock/`
- `GET /api/stock/location/`
- `GET /api/user/me/`
- `GET /api/user/roles/`
- `GET /api/user/{id}/`
- `POST /api/auth/v1/auth/login/`
- `POST /api/generate/batch-code/`
- `POST /api/generate/serial-number/`
- `POST /api/parameter/`
- `POST /api/stock/`
- `POST /api/system-internal/observability/end/`
