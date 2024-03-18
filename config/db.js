const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);

const local = "mongodb://127.0.0.1:27017/MyDatabase";

const atlat = "mongodb+srv://dittvpd07594:<ABcWP3oOfYwuCq1P>@cluster0.9se5equ.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connect = async () => {
    try {
        await mongoose.connect(local, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log({ message: 'connect success' });
    } catch (error) {
        console.log({ message: error });
        console.log({ message: 'connect fail' });
    }
}

module.exports = { connect };