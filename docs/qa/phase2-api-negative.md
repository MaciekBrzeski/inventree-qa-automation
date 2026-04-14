| ID | Endpoint | Method | Title | Preconditions | Payload | Expected Status | Expected Body | Priority | Tags |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| API-PARTS-061 | /api/part/ | POST | Attempt to create a part with missing required fields | authenticated as admin | {"name": "Part Name", "description": ""} | 400 | — | P2 | validation |
| API-PARTS-062 | /api/part/ | PUT | Attempt to update a non-existent part | authenticated as admin | {"id": 9999, "name": "New Name"} | 404 | {"detail": "Not found."} | P2 | not-found |
| API-PARTS-063 | /api/part/12345/ | DELETE | Attempt to delete a non-existent part | authenticated as admin | — | 404 | {"detail": "Not found."} | P2 | not-found |
| API-PARTS-064 | /api/category/ | POST | Attempt to create a category with missing required fields | authenticated as admin | {"name": ""} | 400 | — | P2 | validation |
| API-PARTS-065 | /api/category/12345/ | PUT | Attempt to update a non-existent category | authenticated as admin | {"id": 9999, "name": "New Name"} | 404 | {"detail": "Not found."} | P2 | not-found |
| API-PARTS-066 | /api/category/12345/ | DELETE | Attempt to delete a non-existent category | authenticated as admin | — | 404 | {"detail": "Not found."} | P2 | not-found |
| API-PARTS-067 | /api/bomline/ | POST | Attempt to create a BOM line with missing required fields | authenticated as admin | {"part_id": 1, "quantity": 1} | 400 | — | P2 | validation |
| API-PARTS-068 | /api/bomline/12345/ | PUT | Attempt to update a non-existent BOM line | authenticated as admin | {"id": 9999, "part_id": 1, "quantity": 1} | 404 | {"detail": "Not found."} | P2 | not-found |
| API-PARTS-069 | /api/bomline/12345/ | DELETE | Attempt to delete a non-existent BOM line | authenticated as admin | — | 404 | {"detail": "Not found."} | P2 | not-found |
| API-PARTS-070 | /api/part/ | POST | Attempt to create a part with an invalid IPN (duplicate) | authenticated as admin; existing part with IPN "IPN123" | {"name": "Part Name", "ipn": "IPN123"} | 400 | — | P2 | validation |
| API-PARTS-071 | /api/part/12345/ | PUT | Attempt to update a part with an invalid IPN (duplicate) | authenticated as admin; existing part with IPN "IPN123" | {"id": 12345, "ipn": "IPN123"} | 400 | — | P2 | validation |
| API-PARTS-072 | /api/part/12345/ | DELETE | Attempt to delete a part with an invalid IPN (duplicate) | authenticated as admin; existing part with IPN "IPN123" | {"id": 12345, "ipn": "IPN123"} | 400 | — | P2 | validation |
| API-PARTS-073 | /api/part/12345/ | POST | Attempt to update a part with an invalid IPN (duplicate) | authenticated as admin; existing part with IPN "IPN123" | {"id": 12345, "ipn": "IPN123"} | 400 | — | P2 | validation |
| API-PARTS-074 | /api/part/12345/ | PUT | Attempt to update a part with an invalid IPN (duplicate) | authenticated as admin; existing part with IPN "IPN123" | {"id": 12345, "ipn": "IPN123"} | 400 | — | P2 | validation |
| API-PARTS-075 | /api/part/12345/ | DELETE | Attempt to delete a part with an invalid IPN (duplicate) | authenticated as admin; existing part with IPN "IPN123" | {"id": 12345, "ipn": "IPN123"} | 400 | — | P2 | validation |

NEED_CONTEXT: `409 Conflict` on duplicate IPN if the docs state uniqueness.