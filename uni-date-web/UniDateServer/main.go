package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "服务器已启动！Hello from UniDate!")
	})

	fmt.Println("服务器运行在 http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
