# Dockerfileでは#でコメントアウト

# FROM *** で使用するベースイメージを指定.
FROM centos

# Label付
# MAINTAINER tSekikawa
# LABEL version="1.0"
# LABEL description="running nginx!"

# コマンドを実行する場合にはRUNを用いる.
# RUN で実行するコマンドは && や \ を用いてなるべく連結させる.
RUN yum update && yum install -y \
    epel-release \
    nginx

# COPY は指定したホストのディレクトリをコピーする.
COPY ./frontend/dist/ /usr/share/nginx/

# EXPOSE は開けるポートを指定する.
EXPOSE 80

# CMD はソフトウェアの実行に用いる.
# CMD ["command", "引数","引数"]
# のように記述する.
# ここでコマンドをforegroundで実行させる必要がある.
CMD ["nginx", "-g", "daemon off;"]