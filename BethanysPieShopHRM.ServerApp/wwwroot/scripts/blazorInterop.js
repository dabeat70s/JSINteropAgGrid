var blazorInterop = blazorInterop || {};

blazorInterop.showAlert = function (message) {
  alert(message);
};

blazorInterop.logToConsoleTable = function (obj) {
  console.table(obj);
};

blazorInterop.showPrompt = function (message, defaultValue) {
  return prompt(message, defaultValue);
};

blazorInterop.createEmployee = function (firstName, lastName) {
  return { firstName, lastName, email: firstName + "@thomasclaudiushuber.com" };
};

blazorInterop.focusElement = function (element) {
  element.focus();
};

blazorInterop.focusElementById = function (id) {
  var element = document.getElementById(id);
  if (element) element.focus();
};

blazorInterop.throwsError = function () {
  throw Error("Thomas didn't implement this function");
};

//Chapter 4


blazorInterop.callStaticDotNetMethod = function () {
    var promise = DotNet.invokeMethodAsync("BethanysPieShopHRM.ServerApp",
        "BuildEmail", "Style_ADA");
    promise.then(email => alert(email));
};

blazorInterop.callStaticDotNetMethodCustomIdentifier = function () {
    var promise = DotNet.invokeMethodAsync("BethanysPieShopHRM.ServerApp",
        "BuildEmailWithLastName", "Thomas", "Huber");
    promise.then(email => alert(email));
};

blazorInterop.callDotNetInstanceMethod = function (dotNetObjectRef) {
    dotNetObjectRef.invokeMethodAsync("SetWindowSize",
        {
            width: window.innerWidth,
            height: window.innerHeight
        });
};

blazorInterop.registerResizeHandler = function (dotNetObjectRef) {
    function resizeHandler() {
        dotNetObjectRef.invokeMethodAsync("SetWindowSize",
            {
                width: window.innerWidth,
                height: window.innerHeight
            });
    };

    // Set up initial values
    resizeHandler();

    // Register event handler
    window.addEventListener("resize", resizeHandler);
};
blazorInterop.test = function deleteII()
{
    const Employee = {
        firstname: 'John',
        lastname: 'Doe'
    };
    var oene = 1;``
    var teo = 2;
    var tre = "3";
    console.log("1st == ",oene);
    console.log("2nd == ", teo);
    console.log("tre == ", tre);
    console.log("Employee.firstname == ", Employee.firstname);
    var firstDel = delete oene;
    var secondDel = delete teo;
    var thirdDel = delete tre;
    var fourthDel = delete Employee.firstname;
    console.log("3st == ", oene);
    console.log("4nd == ", teo);
    console.log("tre == ", tre);
    console.log("Employee.firstname == ", Employee.firstname);
    console.log("firstDel == ", firstDel);
    console.log("secondDel == ", secondDel);
    console.log("thirdDel == ", thirdDel);
    console.log("fourthDel == ", fourthDel);
    console.log("Employee deleted? == ", delete Employee);

};
//blazorInterop.registerOnlineHandler = function (dotNetObjectRef) {
//    function onlineHandler() {
//        dotNetObjectRef.invokeMethodAsync("SetOnlineStatus",
//            navigator.onLine);
//    };

//    // Set up initial values
//    onlineHandler();

//    // Register event handler
//    window.addEventListener("online", onlineHandler);
//    window.addEventListener("offline", onlineHandler);
//};