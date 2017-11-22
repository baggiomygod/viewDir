<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{title}}</title>
    <style>
        .a-view{
            display: inline-block;
        }
        .icon{
            width: 18px;
            height: 18px;
        }
    </style>
</head>
<body>
    {{#each files}}
    <div>
        <img class="icon" src="/src/static/img/icon/{{icon}}.png" alt="">
        <a href="{{../dir}}/{{file}}" class="a-view">
        {{file}}
        </a>
    </div>
    {{/each}}
</body>
</html>