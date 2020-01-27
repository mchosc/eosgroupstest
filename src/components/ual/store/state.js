export default {
  //
  showLoginModal: false,
  isTransacting: false,
  signingOverlay: {
    show: false,
    status: "", //0=wait for sig, 1=success, 2=error
    msg: ""
  },
  activeAuthenticator: null,
  UAL: null,
  accountName: null,
  SESSION: {
    accountName: null,
    authenticatorName: null,
    timestamp: null,
    network: null
  },

  activeNetwork: "jungle",

  networks: {
    mainnet: {
      config: {
        chainId:
          "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
        rpcEndpoints: [
          {
            protocol: "https",
            host: "api.eostitan.com",
            port: "443"
          }
        ]
      }
    },
    jungle: {
      config: {
        chainId:
          "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
        rpcEndpoints: [
          {
            protocol: "https",
            host: "jungle2.cryptolions.io",
            port: 443
          }
        ]
      }
    },
    kylin: {
      config: {
        chainId:
          "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191",
        rpcEndpoints: [
          {
            protocol: "https",
            host: "api.kylin.alohaeos.com",
            port: 443
          }
        ]
      }
    },
  }
};
