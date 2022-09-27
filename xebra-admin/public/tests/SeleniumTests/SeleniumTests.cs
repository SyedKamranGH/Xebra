using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium.Support.UI;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;

namespace SeleniumTests
{
    class SeleniumTests
    {
        XebraAdminHelperFunctions helpers;


        [OneTimeSetUp]
        public void StartBrowser()
        {
            helpers = new XebraAdminHelperFunctions();
        }

        [Test]
        public void LoginTest()
        {
            helpers.Login();
        }

        [Test]
        public void LogoutTest()
        {
            helpers.Logout();
        }

        [OneTimeTearDown]
        public void CloseBrowser()
        {
            helpers.TearDown();
        }
    }
}
