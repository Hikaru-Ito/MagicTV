import request from 'axios'
import ConvertMenuData from './convert_menudata'


export default function load_content_data(url) {
    return new Promise((resolve, reject) => {
        request.get(url)
            .then(res => {
                console.log(res.data)
                resolve(ConvertMenuData(res.data))
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}