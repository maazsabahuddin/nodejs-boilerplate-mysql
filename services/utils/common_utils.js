
module.exports = {
    get_time(offset) {
        // offset should be in minutes
        if(offset){
            let time  = new Date(new Date().getTime() + offset*60000);
            return Math.round(time/1000);
        }
        return Math.round(new Date()/1);
    }
}