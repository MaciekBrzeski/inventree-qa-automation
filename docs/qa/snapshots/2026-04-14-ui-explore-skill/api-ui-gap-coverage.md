# api-ui-gap coverage report

Generated: 2026-04-14T10:29:26.913Z

## Summary

- OpenAPI endpoints in scope: **83**
- Covered by at least one UI test: **11**
- Uncovered: **72**
- Dead (requests observed but not in OpenAPI): **15**
- Coverage ratio: **13.3%**

## Covered endpoints

| endpoint | hitting tests |
|---|---|
| `DELETE /api/part/category/{id}/` | 1 |
| `DELETE /api/part/{id}/` | 1 |
| `GET /api/part/` | 2 |
| `GET /api/part/category/` | 3 |
| `GET /api/part/category/{id}/` | 15 |
| `GET /api/part/{id}/` | 11 |
| `GET /api/part/{id}/requirements/` | 11 |
| `GET /api/part/{id}/serial-numbers/` | 11 |
| `PATCH /api/part/{id}/` | 1 |
| `POST /api/part/` | 1 |
| `POST /api/part/category/` | 1 |

## Uncovered endpoints + suggested seeds

| endpoint | suggested ui-explore seed |
|---|---|
| `DELETE /api/bom/` | /web/part/<assembly-pk> → BOM tab |
| `DELETE /api/bom/substitute/{id}/` | /web/part/<assembly-pk> → BOM tab |
| `DELETE /api/bom/{id}/` | /web/part/<assembly-pk> → BOM tab |
| `DELETE /api/part/category/parameters/{id}/` | /web/partcategory/<pk> |
| `DELETE /api/part/internal-price/{id}/` | /web/part/<pk> → Part Pricing tab |
| `DELETE /api/part/related/{id}/` | /web/part/<pk> → Related Parts tab |
| `DELETE /api/part/sale-price/{id}/` | /web/part/<pk> → Part Pricing tab |
| `DELETE /api/part/stocktake/` | /web/part/<pk> → Stock → Stocktake |
| `DELETE /api/part/stocktake/{id}/` | /web/part/<pk> → Stock → Stocktake |
| `DELETE /api/part/test-template/{id}/` | /web/part/<pk> → Test templates tab |
| `GET /api/bom/` | /web/part/<assembly-pk> → BOM tab |
| `GET /api/bom/substitute/` | /web/part/<assembly-pk> → BOM tab |
| `GET /api/bom/substitute/{id}/` | /web/part/<assembly-pk> → BOM tab |
| `GET /api/bom/{id}/` | /web/part/<assembly-pk> → BOM tab |
| `GET /api/part/category/parameters/` | /web/partcategory/<pk> |
| `GET /api/part/category/parameters/{id}/` | /web/partcategory/<pk> |
| `GET /api/part/category/tree/` | /web/partcategory/<pk> |
| `GET /api/part/internal-price/` | /web/part/<pk> → Part Pricing tab |
| `GET /api/part/internal-price/{id}/` | /web/part/<pk> → Part Pricing tab |
| `GET /api/part/related/` | /web/part/<pk> → Related Parts tab |
| `GET /api/part/related/{id}/` | /web/part/<pk> → Related Parts tab |
| `GET /api/part/sale-price/` | /web/part/<pk> → Part Pricing tab |
| `GET /api/part/sale-price/{id}/` | /web/part/<pk> → Part Pricing tab |
| `GET /api/part/stocktake/` | /web/part/<pk> → Stock → Stocktake |
| `GET /api/part/stocktake/{id}/` | /web/part/<pk> → Stock → Stocktake |
| `GET /api/part/test-template/` | /web/part/<pk> → Test templates tab |
| `GET /api/part/test-template/{id}/` | /web/part/<pk> → Test templates tab |
| `GET /api/part/thumbs/` | /web/part/<pk> → image upload |
| `GET /api/part/thumbs/{id}/` | /web/part/<pk> → image upload |
| `GET /api/part/{id}/bom-validate/` | /web/part or /web/part/<pk> |
| `GET /api/part/{id}/pricing/` | /web/part or /web/part/<pk> |
| `PATCH /api/bom/substitute/{id}/` | /web/part/<assembly-pk> → BOM tab |
| `PATCH /api/bom/{id}/` | /web/part/<assembly-pk> → BOM tab |
| `PATCH /api/bom/{id}/validate/` | /web/part/<assembly-pk> → BOM tab |
| `PATCH /api/part/` | /web/part or /web/part/<pk> |
| `PATCH /api/part/category/` | /web/partcategory/<pk> |
| `PATCH /api/part/category/parameters/{id}/` | /web/partcategory/<pk> |
| `PATCH /api/part/category/{id}/` | /web/partcategory/<pk> |
| `PATCH /api/part/internal-price/{id}/` | /web/part/<pk> → Part Pricing tab |
| `PATCH /api/part/related/{id}/` | /web/part/<pk> → Related Parts tab |
| `PATCH /api/part/sale-price/{id}/` | /web/part/<pk> → Part Pricing tab |
| `PATCH /api/part/stocktake/{id}/` | /web/part/<pk> → Stock → Stocktake |
| `PATCH /api/part/test-template/{id}/` | /web/part/<pk> → Test templates tab |
| `PATCH /api/part/thumbs/{id}/` | /web/part/<pk> → image upload |
| `PATCH /api/part/{id}/bom-validate/` | /web/part or /web/part/<pk> |
| `PATCH /api/part/{id}/pricing/` | /web/part or /web/part/<pk> |
| `POST /api/bom/` | /web/part/<assembly-pk> → BOM tab |
| `POST /api/bom/substitute/` | /web/part/<assembly-pk> → BOM tab |
| `POST /api/part/category/parameters/` | /web/partcategory/<pk> |
| `POST /api/part/internal-price/` | /web/part/<pk> → Part Pricing tab |
| `POST /api/part/related/` | /web/part/<pk> → Related Parts tab |
| `POST /api/part/sale-price/` | /web/part/<pk> → Part Pricing tab |
| `POST /api/part/stocktake/` | /web/part/<pk> → Stock → Stocktake |
| `POST /api/part/stocktake/generate/` | /web/part/<pk> → Stock → Stocktake |
| `POST /api/part/test-template/` | /web/part/<pk> → Test templates tab |
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
- `GET /api/auth/v1/auth/session/`
- `GET /api/auth/v1/config/`
- `GET /api/generic/status/`
- `GET /api/icons/`
- `GET /api/news/`
- `GET /api/notifications/`
- `GET /api/plugins/`
- `GET /api/settings/global/`
- `GET /api/settings/user/`
- `GET /api/user/me/`
- `GET /api/user/roles/`
- `GET /api/user/{id}/`
- `POST /api/auth/v1/auth/login/`
- `POST /api/system-internal/observability/end/`
