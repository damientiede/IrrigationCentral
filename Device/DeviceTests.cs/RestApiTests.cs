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

        string testClientId = "YHK0V1SWiuBPBMZ5JSMm7PCbmzBpqWU5";
        string testClientSecret = "-uN3wwbuISDGxKl2W6zJdaPWO179SFWd59QNm7ckZR7grEthvWnwgActvwqrilVb";
        string testRestApiUri = "http://irrigationcentral.co.nz:8011";
        
        private IRestApi GetTestClient()
        {
            AuthClientSecret testsecret = new AuthClientSecret()
            {
                client_id = testClientId,
                client_secret = testClientSecret,
                audience = testRestApiUri,
                grant_type = "client_credentials"
            };

            return new RestApiClient(testRestApiUri, authServerUri, testsecret);
        }

        private IRestApi GetProdClient()
        {
            AuthClientSecret secret = new AuthClientSecret()
            {
                client_id = clientId,
                client_secret = clientSecret,
                audience = restApiUri,
                grant_type = "client_credentials"
            };

            return new RestApiClient(restApiUri, authServerUri, secret);
        }
        [TestMethod]
        public void DeviceHasIrrigationAction()
        {
            IRestApi client = GetTestClient();
            Device d = client.GetDevice(1);
            Assert.IsTrue(d.IrrigationAction != null);
        }
        [TestMethod]
        public void CanAccessTheRestAPIWithAuthentication()
        {
            IRestApi client = GetTestClient();
            Device d = client.GetDevice(1);
            Assert.AreEqual(d.DeviceMAC, "B827EB1C9BA9");
        }

        [TestMethod] 
        public void GetProgramWithNestedSteps()
        {
            IRestApi client = GetTestClient();
            Program p = client.GetProgram(1);
            Assert.IsTrue(p.Steps.Length > 0);
        }
        [TestMethod]
        public void GetProgramWithNestedStepsAndIrrigationAction()
        {
            IRestApi client = GetTestClient();
            Program p = client.GetProgram(1);
            Assert.IsTrue(p.Steps[0].IrrigationAction != null);
        }
        [TestMethod]
        public void CanRegisterExistingDevice()
        {
            IRestApi client = GetTestClient();
            Device d = client.Register("B827EB1C9BA9");            
            Assert.IsTrue(d != null);
        }
        [TestMethod]
        public void UpdateDeviceIrrigationAction()
        {
            IRestApi client = GetTestClient();
            Device d = client.GetDevice(1);
            d.IrrigationActionId = null;
            client.PutDeviceStatus(d);
            d = client.GetDevice(1);
            Assert.IsTrue(d.IrrigationAction == null);
        }
    }
}
