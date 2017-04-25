# Van Rees Dashboard

## Usage

```bash
git clone https://github.com/kukua/vanrees-dashboard.git
cd vanrees-dashboard/
cp src/js/config.js.example src/js/config.js
chmod 600 src/js/config.js

# Development
yarn install
npm start

# Staging
docker-compose run --rm dashboard yarn install
docker-compose run --rm dashboard npm run build
docker-compose up -d

# Production
docker-compose run --rm dashboard yarn install
docker-compose run --rm dashboard npm run build-prod
docker-compose up -d
```

## License

This software is licensed under the [MIT license](https://github.com/vanrees-kukua/dashboard/blob/master/LICENSE).

© 2017 Kukua BV
