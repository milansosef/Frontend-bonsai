export default class DataLoader {

    static async loadJSON(url:string): Promise<any> {
        // tip: CMD+CLICK op een type om alle opties te zien
        const myHeaders = new Headers();

        const init:RequestInit = {
            method: "GET",
            headers: myHeaders,
            mode: "cors",
            cache: "default"
        };

        let res = await fetch(url, init)
        return await res.json()
    }

    static async postJSON(url:string, data:object): Promise<any> {

        // tip: CMD+CLICK op een type om alle opties te zien
        const myHeaders = new Headers({
            'Content-Type': 'application/json'
          });

        const init:RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data),
            mode: "cors",
            cache: "default"
        };

        console.log("posting now...")
        let res = await fetch(url, init)
        
        console.log("posted")
        console.log(res)

        return res
    }

    static async putJSON(url:string, data:object): Promise<any> {

        // tip: CMD+CLICK op een type om alle opties te zien
        const myHeaders = new Headers({
            'Content-Type': 'application/json'
          });
        // const data = {
        //     "title": "Ja ",
        //     "species": "Nee",
        //     "age": "Skurrr",
        //     "price": "Poppop"
        // };

        const init:RequestInit = {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(data),
            mode: "cors",
            cache: "default"
        };

        console.log("putting now...")
        let res = await fetch(url, init)

        console.log("put succesful")
        console.log(res)

        return res
    }

    static async delete(url:string): Promise<any> {

        const init:RequestInit = {
            method: "DELETE",
            mode: "cors",
            cache: "default"
        };

        console.log("deleting now...")
        let res = await fetch(url, init)

        console.log("delete succesful")
        console.log(res)

        return res
    }

    static async loadImage(img: string): Promise<any> {
        let url = `http://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(img)}&api_key=dc6zaTOxFJmzC`
        let res = await fetch(url)
        let json = await res.json()
        return await DataLoader.checkData(json)
    }

    static async checkData(json: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if (json.data.length == 0) {
                reject("No gif found!")
            } else {
                let ind:number = Math.floor(Math.random()*json.data.length)
                let gifurl: string = json.data[ind].images.fixed_height.url;
                resolve(gifurl);
            }
        })
    }
}