Angular Bootstrap
======

After you clone the repository, start install dependencies.

```sh
npm install
```

```sh
bower install
```


Add nginx configuration

```sh
server {
       listen   80;

       server_name dev.angular.com;

       root <project-directory>/www;
       index index.html;
       location / {
               try_files $uri $uri/ /index.html =404;
       }
}
```

Add `dev.angular.com` to your hosts.

Now you can run the project on your local by:

```sh
gulp watch:dev
```
