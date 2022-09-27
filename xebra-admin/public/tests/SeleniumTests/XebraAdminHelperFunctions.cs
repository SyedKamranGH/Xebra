using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Support.UI;

namespace SeleniumTests
{
    public class XebraAdminHelperFunctions
    {
        IWebDriver driver;
        WebDriverWait defaultPageTimeout;
        WebDriverWait loginPageTimeout;
        string rootDirectory;
        string processDirectory;
        string solutionDirectory;
        Credentials credentials;

        /// <summary>
        /// Credentials being stored for authentication xebra login.
        /// User info is included.
        /// </summary>
        internal class Credentials
        {
            [JsonProperty("username")]
            protected internal string Username { get; set; }

            [JsonProperty("password")]
            protected internal string Password { get; set; }

            [JsonProperty("given_name")]
            protected internal string GivenName { get; set; }

            [JsonProperty("family_name")]
            protected internal string FamilyName { get; set; }
        }

        public bool IsSetup { get; set; }

        /// <summary>
        /// Set up the initial environment for begininng tests. Default is chrome driver.
        /// </summary>
        public void Setup()
        {
            IsSetup = false;
            // assign all necessary repositories.
            processDirectory = AppContext.BaseDirectory;
            rootDirectory = processDirectory.Substring(0, processDirectory.IndexOf("tests"));
            solutionDirectory = processDirectory.Substring(0, processDirectory.IndexOf("SeleniumTests"));

            // load the secrets (user info and credentials).
            string secretsFile = Path.Combine(solutionDirectory, "secrets.json");
            using (StreamReader file = File.OpenText(secretsFile))
            using (JsonTextReader reader = new JsonTextReader(file))
            {
                JObject o2 = (JObject)JToken.ReadFrom(reader);

                credentials = JsonConvert.DeserializeObject<Credentials>(o2.ToString());
            }

            // setup the chrome driver
            driver = new ChromeDriver(processDirectory);

            // setup default page timeouts
            defaultPageTimeout = new WebDriverWait(driver, new TimeSpan(0, 0, 30));
            loginPageTimeout = new WebDriverWait(driver, new TimeSpan(0, 0, 10));

            IsSetup = true;
        }

        /// <summary>
        /// Login to xebra page.
        /// </summary>
        public void Login()
        {
            if (!IsSetup)
                Setup();

            // let's navigate to login page
            driver.Url = rootDirectory + "login.html";

            // wait until the login page loads
            loginPageTimeout.Until(d => d.FindElement(By.Id("email-input-login")));

            // input the credentials on the appropriate fields
            var usernameTextField = driver.FindElement(By.Id("email-input-login"));
            var passwordTextField = driver.FindElement(By.Id("password-input-login"));
            var submitButton = driver.FindElement(By.Id("submit-btn"));
            usernameTextField.SendKeys(credentials.Username);
            passwordTextField.SendKeys(credentials.Password);

            // submit
            submitButton.Click();
            
            // wait until the logged in page loads, if success should show the appropriate user given_name on
            // top right corner. Fail on timeout.
            var userInfo = defaultPageTimeout.Until(ExpectedConditions.ElementExists(By.Id("user-info")));
            loginPageTimeout.Until(ExpectedConditions.TextToBePresentInElement(userInfo, credentials.GivenName));
            Console.WriteLine(userInfo);
        }

        /// <summary>
        /// Logout to xebra page. Assumes we are still logged in.
        /// </summary>
        public void Logout()
        {
            // we assume we are logged in so Logout option should be available.
            var usernameDropdown = driver.FindElement(By.ClassName("dropdown-toggle"));
            var logoutLink = driver.FindElement(By.Id("logout"));
            usernameDropdown.Click();
            logoutLink.Click();

            loginPageTimeout.Until(d => d.FindElement(By.Id("email-input-login")));
            Thread.Sleep(1000);
        }

        /// <summary>
        /// Releases all resources
        /// </summary>
        public void TearDown()
        {
            driver.Close();
        }
    }
}
