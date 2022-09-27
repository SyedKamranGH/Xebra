# Before getting started please read below.

Optional - To view this file correctly in Visual Studio, install Markdown Editor.
https://marketplace.visualstudio.com/items?itemName=MadsKristensen.MarkdownEditor

Make sure that you:
- Install Nugget packages. Right click on Solution project and click "Restore NuGet packages."
- Create a json file **`secrets.json`** in the solution root folder(/tests/) with the below format

**`IMPORTANT: DO NOT COMMIT YOUR CREDENTIALS. DO NOT INSERT YOUR CREDENTIALS BELOW, ITS ONLY USED AS EXAMPLE`**

```
{
  "username": "some@email.com",
  "password": "somepassword",
  "given_name": "SomeGivenName",
  "family_name":  "SomeFamilyName"
}
```

- To run the tests, click on **Test** > **Windows** > **Text Explorer** *( shortcut Ctrl + E, T)*
