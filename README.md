# Slides

bit.ly/fem-webvr

# Poly API - Web Sample

Copyright (c) 2017 Google Inc. All rights reserved.

This is a sample project showing how to invoke the
[Poly API](https://developers.google.com/poly) from
a web app.

## How to run

First, generate an API Key for the Poly API following the instructions in [the
developer documentation](https://developers.google.com/poly/develop).

Then, enter your API key in each of the HTML files in this sample, replacing
the value of the `API_KEY` variable or by creating a config.js:

    const API_KEY = "*** INSERT YOUR API KEY HERE ***";
    
    
When replacing, do not leave the asterisks, replace the entire string by
your API Key.

If you have Python installed, you can use the `SimpleHTTPServer` module
to serve a local directory for testing:

    cd /examples/
    python -m SimpleHTTPServer 8000

Or you can npm install and run:

```bash
npm install
npm run start
```
These are the available samples:

* **examples/basic-sample.html**. Shows how to load and display a single asset
  with known ID.

* **examples/search-sample.html**. Shows how to search for assets and display them.

* **examples/tiltbrush-sample.html**. Shows how to load and display a Tilt Brush sketch.

## License

For license information, refer to the `LICENSE` file.

