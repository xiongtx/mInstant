// ChatMessage object

ChatMessage = function(from, to, message){
    this.from = from;
    this.to = to;
    this.message = message || "";
    this.date = new Date();
};
