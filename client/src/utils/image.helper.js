import { EVENTS } from "./costants";

export const uploadImage = async (client, files) => {


    const file = files[0]
    let url = URL.createObjectURL(file)
    let blob = await fetch(url).then(r => r.blob());



    console.log(blob)

    client.send(JSON.stringify({
        type: EVENTS.IMAGE_UPLOAD,
        file: blob
    }));

    // var base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");

    // require("fs").writeFile("out.png", base64Data, 'base64', function (err) {
    //     console.log(err);
    // });
}