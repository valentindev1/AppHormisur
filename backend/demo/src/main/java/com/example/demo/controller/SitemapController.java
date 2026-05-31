package com.example.demo.controller;


import com.example.demo.dto.articulo.ArticuloResponseDTO;
import com.example.demo.service.articulo.ArticuloService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class SitemapController {

    private final ArticuloService articuloService;

    @GetMapping(value = "/sitemap.xml", produces = "application/xml")
    public String generarSitemap() {

        List<ArticuloResponseDTO> articulos = articuloService.listar();

        StringBuilder xml = new StringBuilder();

        xml.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        xml.append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">");

        // ✅ HOME
        xml.append("<url>");
        xml.append("<loc>https://hormisursas.com.co/</loc>");
        xml.append("<priority>1.0</priority>");
        xml.append("</url>");

        // ✅ PÁGINAS ESTÁTICAS
        String[] paginas = {
                "/noticias",
                "/nosotros",
                "/concretos",
                "/trabaja-con-nosotros",
                "/contacto",
                "/maquinaria",
                "/prefabricados",
                "/proyectos",
                "/politica-privacidad",
                "/terminos-condiciones"
        };

        for (String pagina : paginas) {
            xml.append("<url>");
            xml.append("<loc>https://hormisursas.com.co").append(pagina).append("</loc>");
            xml.append("</url>");
        }

        // ✅ ARTÍCULOS (FILTRANDO SOLO PUBLICADOS)
        for (ArticuloResponseDTO a : articulos) {

            if (!Boolean.TRUE.equals(a.getPublicada())) continue;

            xml.append("<url>");

            xml.append("<loc>");
            xml.append("https://hormisursas.com.co/articulos/")
                    .append(a.getCategoria())
                    .append("/")
                    .append(a.getSlug());
            xml.append("</loc>");

            // ✅ FECHA FORMATEADA (IMPORTANTE PARA GOOGLE)
            if (a.getFechaPublicacion() != null) {

                String fecha = a.getFechaPublicacion()
                        .format(DateTimeFormatter.ISO_DATE);

                xml.append("<lastmod>").append(fecha).append("</lastmod>");
            }

            xml.append("<priority>0.9</priority>");

            xml.append("</url>");
        }

        xml.append("</urlset>");

        return xml.toString();
    }
}