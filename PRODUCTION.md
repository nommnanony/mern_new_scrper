# Production Deployment Guide

## Pre-Deployment Checklist

### Security
- [ ] Generate a strong JWT_SECRET (min 32 characters)
  ```bash
  # Generate a secure secret
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- [ ] Update all environment variables in production
- [ ] Ensure MONGODB_URI uses a secure MongoDB instance
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS for all communications
- [ ] Configure ALLOWED_ORIGINS for CORS (no wildcards in production)

### Database
- [ ] MongoDB Atlas cluster created with proper security:
  - [ ] IP Whitelist configured (or use VPC Peering)
  - [ ] Database user with strong password
  - [ ] Regular backups enabled
  - [ ] Encryption at rest enabled
- [ ] Database indexes created for better performance

### Code
- [ ] All tests passing
- [ ] No console.logs left (or use proper logging library)
- [ ] Error handling in place
- [ ] Input validation on all endpoints
- [ ] No sensitive data in code or git history

### Frontend
- [ ] Build optimized (`npm run build`)
- [ ] All API URLs point to production backend
- [ ] Environment variables correctly set
- [ ] No development dependencies in production

## Environment Variables

### Backend (.env in production)
```
NODE_ENV=production
PORT=3000
MONGODB_URI=yururl
JWT_SECRET=your_secure_secret_here
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
HACKER_NEWS_URL=https://news.ycombinator.com
```

### Frontend (.env in production)
```
REACT_APP_API_URL=https://api.yourdomain.com/api
```

## Deployment Options

### Option 1: Heroku
```bash
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production JWT_SECRET=your_secret MONGODB_URI=your_uri

# Deploy
git push heroku main
```

### Option 2: Render
1. Connect GitHub repo
2. Create Web Service
3. Set environment variables in dashboard
4. Auto-deploys on git push

### Option 3: DigitalOcean/AWS/Azure
1. Set up VM/Container
2. Install Node.js
3. Clone repo
4. Install dependencies: `npm install`
5. Build frontend: `cd frontend && npm run build`
6. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start backend/server.js --name "mern-app"
   pm2 startup
   pm2 save
   ```
7. Set up Nginx as reverse proxy
8. Configure SSL with Let's Encrypt

## Monitoring & Maintenance

### Logging
- Use Winston or Morgan for structured logging
- Monitor logs for errors
- Set up log rotation

### Performance
- Monitor database query performance
- Check server CPU/memory usage
- Implement caching if needed

### Backups
- Daily MongoDB backups
- Document recovery procedures
- Test restore process regularly

## Security Best Practices

1. **Never commit .env files** - Already in .gitignore ✓
2. **Use HTTPS** - Always in production
3. **Keep dependencies updated** - Run `npm audit` regularly
4. **Implement rate limiting** - Prevent abuse
5. **Sanitize input** - Already done with validation ✓
6. **Use secure cookies** - For session management
7. **Enable CORS properly** - Configured for production ✓
8. **Monitor for suspicious activity** - Check logs

## Performance Optimization

1. **Database Indexes** - Add indexes for frequently queried fields
2. **Caching** - Implement Redis for frequently accessed data
3. **CDN** - Use CDN for static assets
4. **Compression** - Enable gzip compression
5. **Load Balancing** - Use load balancer for multiple instances

## Rollback Procedure

```bash
# If deployment fails:
git revert HEAD
git push
# Re-deploy
```

## Support & Troubleshooting

### Check Logs
```bash
# Heroku
heroku logs --tail

# Local PM2
pm2 logs
```

### Common Issues

**CORS Errors**
- Check ALLOWED_ORIGINS environment variable
- Ensure frontend URL matches

**MongoDB Connection Errors**
- Verify MONGODB_URI
- Check IP whitelist in MongoDB Atlas
- Verify database user password

**Port Already in Use**
- Change PORT in .env
- Or kill process: `lsof -i :3000`

## Contact & Emergency

For critical issues during deployment:
1. Check logs first
2. Verify all environment variables
3. Test locally with same env vars
4. Consider rolling back to last working version
