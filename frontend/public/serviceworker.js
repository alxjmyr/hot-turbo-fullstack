// This code executes in its own worker or thread
self.addEventListener("install", event => {
    console.log("Service worker installed!!!");
});
self.addEventListener("activate", event => {
    console.log("Service worker activated!!!");
});

// this basic push event listener works... But doesn't really do anything yet
// #TODO: Expand on this to authorize and handle push notifications
// self.addEventListener("push", event => {
//   console.log("A Push Event Happened");
//   console.log(event);
//   console.log(event.data.json())
// })