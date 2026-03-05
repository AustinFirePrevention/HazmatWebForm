```bash
curl -X POST "https://prod-08.usgovtexas.logic.azure.us:443/workflows/cc81a18f43ca44d38a582cbb2558b91e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-aivnhs83y1zB8GXU2C5G28RrHdUtmzo8xP_7brUl10" \
  -H "Content-Type: application/json" \
  --data-binary @payload.json
```


# test

```bash
curl -X POST https://httpbin.org/post \
  -H "Content-Type: application/json" \
  --data-binary @testPayload.json
```