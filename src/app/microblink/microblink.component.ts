import { Component, OnInit } from '@angular/core';

declare var Microblink: any;

@Component({
  selector: 'app-microblink',
  templateUrl: './microblink.component.html',
  styleUrls: ['./microblink.component.scss']
})

export class MicroblinkComponent implements OnInit {
  recognizer: string = 'MRTD'

  constructor(){}

  ngOnInit() {
    this.setupMicroblink()
  }

  setupMicroblink() {
    // 2. configure Microblink SDK
    // 2.1. set endpoint
    // 2.1.1. if not set default value is `https://api.microblink.com`
    // Microblink.SDK.SetEndpoint('https://api.microblink.com')
    //Microblink.SDK.SetEndpoint(environment.microblinkApi)

    // 2.1.2. for self-hosted on-premise microblink/api Docker Image available at Docker Hub
    // https://hub.docker.com/r/microblink/api
    // it is required to set endpoint where Microblink API is available
    // Microblink.SDK.SetEndpoint('http://localhost:8081')
    // Microblink.SDK.SetEndpoint('https://wt-f2bc1e742928378c2eda881f7dd00276-0.sandbox.auth0-extend.com/microblinkApiProxyExample')

    // 2.2. set recognizers (more recognizer -> slower response)
    // available recognizers at `https://api.microblink.com/recognize/info` at `data.recognizer.available`
    // Microblink.SDK.SetRecognizers(['MRTD'])
    Microblink.SDK.SetRecognizers(this.recognizer)

    // 2.3. disable persisting uploaded data (this option is ignored if Authorization header is set)
    Microblink.SDK.SetIsDataPersistingEnabled(false)

    // Bearer token NOT needed if we're going through 1id proxy
    // 2.4. set Authorization header (Bearer + ' ' + apiKey + apiSecret) - generate one in Microblink dashboard at https://microblink.com/customer/api
    // if endpoint is not equal to the default value `https://api.microblink.com` then `Authorization` header is ignored (self-hosted Microblink API by default has disabled authorization with Microblink API key/secret)
    // Only add the bearer token for direct api to microblink.
    // If the api is to our proxy, our proxy will add the bearer token to the mb call.
    // if (environment.microblinkApi === 'https://api.microblink.com') {
    //  Microblink.SDK.SetAuthorization('Bearer NWQzNWI3YTBhZjg3NDFlMDk3NDM4ZjJlMzY0OWFkZDU6YzdlYjc0OTktMmYzYS00YTQ4LThlODgtNDc1NGIzM2FmZTE1')
    // }

    // 2.5. default listeners (API's callbacks) are defined inside of the microblink-js UI component, but it is possible to configure global listeners to implement custom success/error handlers
    Microblink.SDK.RegisterListener({
      onScanSuccess: this.onScanSuccess.bind(this),
      onScanError: this.onScanError.bind(this)
    })

    // 3. better UI, this removes microblink-js flash effect because microblink-js UI component (like any other HTML5 web component) loads asynchronusly and component's custom slots will look ugly until it's CSS/JS is loaded propertly (rendering speed depends on the CPU power of the machine where browser is used, 1 second if enough to cover any average machine).
    this.waitForScreenToRender()
  }

  private onScanSuccess(data:any) {
    const results = data.result.data instanceof Array ? data.result.data : [data.result.data]
    
    for (let i = 0; i < results.length; i++) {
      if (results[i].result == null) {
        results.splice(i, 1)
      }
    }

    console.log(results)
  }

  private onScanError(error:any) {
    console.log(error)
  }

  private waitForScreenToRender() {
    setTimeout(() => {
      document.querySelectorAll('.hide-until-component-is-loaded').forEach((element) => {
        element.classList.remove('hide-until-component-is-loaded')
      })
    }, 1000)
  }

}
