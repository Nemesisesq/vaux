export class Data {
    constructor(type, payload, threadID) {
        this.type = type;
        this.payload = payload;
        this.threadID = threadID;
    }

    json() {
        return JSON.stringify({
            type: this.type,
            payload: this.payload,
            thread_id: this.threadID
        })
    }
}

export class Thread {
    constructor(imageUrl, name, priv=false) {

        this.imageUrl = imageUrl;
        this.name = name;
        this.private = priv;
    }


    toJson() {
        return {
            image_url: this.imageUrl,
            name: this.name,
            "private": this.private
        }
    }
}