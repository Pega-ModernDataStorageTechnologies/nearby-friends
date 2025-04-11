from python
copy ../trusted_certs.crt /usr/local/share/ca-certificates/Zscaler_ROOT_CA.crt

copy requirements.txt requirements.txt
run cat /usr/local/share/ca-certificates/Zscaler_ROOT_CA.crt >> /etc/ssl/certs/ca-certificates.crt
run pip install -r requirements.txt

copy flaskr flaskr

expose 5000

cmd ["flask","--app","./flaskr","run","--host=0.0.0.0"]