if ! `nc -z localhost 2000`; then
    echo "pasteboard port 2000 listener already active" 
fi

while true 
do 
    nc -l localhost 2000 | pbcopy
    echo "pasteboard updated from ssh connection"
done
