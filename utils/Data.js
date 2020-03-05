const fs = require('fs');


module.exports = class Data{
    getJsonFileContent(id){
        let json = JSON.parse(fs.readFileSync("./players/"+id+".json"));
        return json;
    }

    HaveAccount(id){
        try {
            if(fs.existsSync("./players/"+id+".json")){
                return 1;
            }else{
                return 0;
            }
        } catch(err) {
            return 0;
        }

    }

    createAccount(id){
        if(this.HaveAccount(id) == 0){
            let json = {
               "win" : 0,
                "loose" : 0
            }
            fs.writeFileSync("./players/"+id+".json", JSON.stringify(json));

        }
    }
    
    writeFile(id, content){
        fs.writeFileSync("./players/"+id+".json", content);
    }
}
