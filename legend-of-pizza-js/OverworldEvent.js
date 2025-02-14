class OverworldEvent {
    constructor({map, event}) {
        this.map = map;
        this.event = event;
    }

    stand(resolve) {
        const who = this.map.gameObjects[ this.event.who ];
        who.startBehavior({
            map: this.map,
        }, {
            type: "stand",
            direction: this.event.direction, 
            time: this.event.time,
        })

        // Set up a handler to complete when correct person is done walking, then resolve the event
        // const completehandler = e => {
        //     if (e.detail.whoId === this.event.who) {
        //         document.removeEventListener("PersonWalkingComplete", completehandler);
        //         resolve();
        //     }
        // }
        // document.addEventListener("PersonWalkingComplete", completehandler);
    }

    walk(resolve) {
        const who = this.map.gameObjects[this.event.who];
        who.startBehavior({
            map: this.map,
        }, {
            type: "walk",
            direction: this.event.direction, 
            retry: true, 
        })

        // Set up a handler to complete when correct person is done walking, then resolve the event
        const completehandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completehandler);
                resolve();
            }
        }
        document.addEventListener("PersonWalkingComplete", completehandler);
    }

    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve);
        })
    }
}