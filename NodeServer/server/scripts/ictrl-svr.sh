#! /bin/sh
# /etc/init.d/ictrl_svr
#

# Some things that run always
touch /var/lock/ictrl_svr

# Carry out specific functions when asked to by the system
case "$1" in
  start)
    echo "Starting Irrigation Data Server "
    echo "Could do more here"
    cd /home/devman/projects/ictrl
    npm run start:dev
    ;;
  stop)
    echo "Stopping Irrigation Data Server"
    
    ;;
  *)
    echo "Usage: /etc/init.d/blah {start|stop}"
    exit 1
    ;;
esac

exit 0