#!/bin/bash

# 检查 PostgreSQL 服务是否运行
if ! pg_isready > /dev/null 2>&1; then
  echo "PostgreSQL 服务未运行，请先启动数据库服务"
  echo "在 macOS 上，你可以使用: brew services start postgresql"
  echo "在 Linux 上，你可以使用: sudo systemctl start postgresql"
  exit 1
fi

# 检查是否存在数据库 - 使用本地用户ken
psql -U ken -c "SELECT 1 FROM pg_database WHERE datname = 'uni-date'" | grep -q 1
if [ $? -ne 0 ]; then
  echo "初始化数据库..."
  # 跳过初始化，因为我们已经手动设置了数据库
  # psql -U ken -f ./scripts/init_db.sql
  echo "请确保数据库'uni-date'已经创建，并且表结构已经正确设置"
fi

# 编译并运行服务器
echo "编译并启动服务器..."
go build -o ./bin/server
./bin/server 