//
// Created by antoine on 17/07/20.
//

#include <cpprest/filestream.h>
#include "../include/HttpServer.h"
#include "../include/Map.h"

HttpServer::HttpServer() = default;

HttpServer::HttpServer(std::string url): m_listener(url) {
    m_listener.support(methods::GET, std::bind(&HttpServer::handle_get, this, std::placeholders::_1));
    m_listener.support(methods::POST, std::bind(&HttpServer::handle_post, this, std::placeholders::_1));
}

HttpServer::~HttpServer() = default;

void HttpServer::handle_post(http_request message) {

//    std::cout << message.body().extract() << std::endl;
    std::cout << "allo" << std::endl;

    message.extract_vector().then([=](std::vector<unsigned char> c) {
        std::cout << c.size() << std::endl;

        std::string s(c.begin(), c.end());
        Protobuf::Map map;

        map.ParseFromString(s);
        std::cout << map.dimensions().x() << std::endl;
        message.reply(status_codes::OK, "yess");
    });

}


void HttpServer::handle_get(http_request message) {
    std::cout << message.to_string() << std::endl;
    message.reply(status_codes::OK,message.to_string());

//    message.body();

/*    auto paths = http::uri::split_path(http::uri::decode(message.relative_uri().path()));

    message.relative_uri().path();

    concurrency::streams::fstream::open_istream(U("static/index.html"), std::ios::in).then([=](concurrency::streams::istream is)
                                                                                           {
                                                                                               message.reply(status_codes::OK, is,  U("text/html"))
                                                                                                       .then([](pplx::task<void> t)
                                                                                                             {
                                                                                                                 try{
                                                                                                                     t.get();
                                                                                                                 }
                                                                                                                 catch(...){
                                                                                                                     //
                                                                                                                 }
                                                                                                             });
                                                                                           }).then([=](pplx::task<void>t)
                                                                                                                                                                                        {
                                                                                                                                                                                            try{
                                                                                                                                                                                                t.get();
                                                                                                                                                                                            }
                                                                                                                                                                                            catch(...){
                                                                                                                                                                                                message.reply(status_codes::InternalError,U("INTERNAL ERROR "));
                                                                                                                                                                                            }
                                                                                                                                                                                        });
*/
}

void HttpServer::handle_error(pplx::task<void> &t) {
    try
    {
        t.get();
    }
    catch(...)
    {
        // Ignore the error, Log it if a logger is available
    }
}

