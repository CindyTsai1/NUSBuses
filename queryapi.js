const request = require('request');
const url = 'https://api.ami-lab.org/api/v1/veniam/location?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0OTkxNzkwMDcsImF1ZCI6Ik5VUyBEYXRhIEFQSSIsImlzcyI6IkFNSSBMYWIsIE5VUyIsInN1YiI6ImUwMDM2NzE2IiwiZXhwIjoxNDk5MjY1NDA3fQ.nyBEBjIGRGa6f7lVCB_ZTE6jAoG3KfTuB89dWxXHSy7XfOw03y1eha6RpuLxbz_F_FTPUMAiPU2MU15-FnadIZO_uk4P2MGP25790jPLhWpH6MidKi9-poZBf4ESkCgu9izgoDzk1DeQGuanSaOYNBB0SJrKIxdU05IbDstZ_LRkOOOdX0-a4yZy9wtGh-UTiTErWnrNXoUZgzlMAj-f3y6v_ggjsShaJV4Ju3DLpt3SFP3UHr8UF9Pha3HOFRfp31Dl7KcAGo3GvufOJmPadp3HiCTOk2aGQ7Ce7H845ZtHPQSqx7QSjvpKvLhUDKEk0YQvVGHWB_RCiVCr-Bclkw';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent' : 'request'}
}, function (err, res, data){
    if (err) {
        console.log('Error: ', err);
    } else if (res.statusCode !== 200) {
        console.log('Status: ', res.statusCode);
    } else {
        console.log(data);
    }
});