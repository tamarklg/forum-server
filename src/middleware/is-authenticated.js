const isAuthenticated = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    ctx.body = new Error('Unauthorized');
    ctx.status = 401;
  }
}

module.exports = isAuthenticated;
