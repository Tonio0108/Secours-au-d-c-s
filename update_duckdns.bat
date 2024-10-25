@echo off
powershell -Command "(Invoke-WebRequest -Uri http://www.duckdns.org/update?domains=secours-au-deces&token=5f52449c-fada-44d7-a181-3685a0b26776&ip=192.168.10.10).Content"
