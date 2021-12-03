import restify from 'restify';
import User from './user-serialize.mjs';

const app = restify.createServer({
  name: 'User-Auth-Service',
  version: '0.0.1'
});

let port = process.env.PORT;

app.listen(port, () => {
  console.log(`${app.name} listening on http://localhost:${port}/`);
});

app.use(restify.plugins.authorizationParser());
app.use(authorize);
app.use(restify.plugins.queryParser());
app.use(restify.plugins.bodyParser({
  mapParams: true
}));

app.get('/users', async (req, resp, next) => {
  let users = await User.list();
  resp.send(users);
});

app.get('/user/:username',async (req, resp, next) => {
  let user = await User.get(req.params.username);
  resp.send(user);
});

app.post('/user', async (req, resp, next) => {
  let user = await User.create(req.body);
  resp.send(user);
});

app.put('/user/:username', async (req, resp, next) => {
  let username = req.params.username;
  let user = await User.get(username);

  req.body.username = username;

  if (user) {
    user = await User.update(req.body);
  } else {
    user = await User.create(req.body);
  }

  resp.send(user);
});

app.del('/user/:username', async (req, resp, next) => {
  let user = await User.get(req.params.username);
  if (!user) {
    resp.send(`No such user ${req.params.username}`);
  } else {
    resp.send(await User.delete(req.params.username));
  }
});

app.post('/user/check/:username', async (req, resp, next) => {
  let username = req.params.username;
  let user = await User.get(username);

  if (!user) {
    resp.send(`Invalid username/password!`);
  } else {
    if (await User.check(username, req.body.password)) {
      resp.send(user);
    } else {
      resp.send(`Invalid username/password!`);
    }
  }
});

let apiKeys = [
  {
   
    user: 'admin',
    key: '4591e3f2-69ca-42f4-be5f-8156a5858769'}
];

function authorize(req, resp, next) {
  if (req.authorization && req.authorization.basic) {
    let found = false;
    for (let auth of apiKeys) {
      if (auth.key === req.authorization.basic.password &&
          auth.user === req.authorization.basic.username) {
        found = true;
        break
      }
    }

    if (found) {
      next()
    } else {
      resp.send(401, new Error('Not authorised'));
      console.log('Invalid login!');
      next(false);
    }
  } else {
    resp.send(500, new Error('Not Auth key'));
    console.log('No auth key!');
    next(false);
  }
}