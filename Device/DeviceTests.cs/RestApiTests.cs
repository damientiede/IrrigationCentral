using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DeviceController.Data;
using DeviceController.Data.Authentication;

namespace DeviceController.Tests
{
    [TestClass]
    public class RestApiTests
    {
        string authServerUri = "https://irrigation-central.au.auth0.com/oauth/token";
        string clientId = "o0vaALZJdfO8TJb2B071sdtowQcYUOg8";
        string clientSecret = "YwYChaKh12Y8MkBgcCUbWGIyh04PkFvVsCeSv2pMJYmO0pHdjrjjN3kKZ_jw4BJl";
        string restApiUri = "http://irrigationcentral.co.nz:8001";

        [TestMethod]
        public void CanAccessTheRestAPIWithAuthentication()
        {
            AuthClientSecret secret = new AuthClientSecret()
            {
                client_id = clientId,
                client_secret = clientSecret,
                audience = restApiUri,
                grant_type = "client_credentials"
            };
            string authToken = AuthTokenProvider.GetAuthToken(authServerUri, secret);
            IRestApi client = new RestApiClient(restApiUri, authToken);
            Device d = client.GetDevice(2);
            Assert.AreEqual(d.DeviceMAC, "B827EB1A9BA9");
        }
    }
}
