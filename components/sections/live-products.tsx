"use client";

import { motion } from "framer-motion";
import { ExternalLink, Zap } from "lucide-react";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { SectionWrapper } from "@/components/premium/section-wrapper";
import { GlassCard } from "@/components/premium/glass-card";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import { LIVE_PRODUCTS } from "@/lib/constants";

const statusConfig = {
  live: { label: "Live", color: "bg-green-500/10 text-green-400 border-green-500/20" },
  beta: { label: "Beta", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  maintenance: { label: "Maintenance", color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
};

export function LiveProductsSection() {
  return (
    <SectionWrapper
      id="products"
      badge="Live Products"
      title="Shipped & Deployed"
      subtitle="Real products built and deployed to production — not just tutorials."
      className="bg-muted/30"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {LIVE_PRODUCTS.map((product, i) => {
          const status = statusConfig[product.status];
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard className="flex h-full flex-col">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 text-lg font-bold text-white">
                    {product.name.charAt(0)}
                  </div>
                  <Badge variant="outline" className={status.color}>
                    <Zap className="mr-1 h-3 w-3" />
                    {status.label}
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="mt-1 text-sm text-violet-400">{product.tagline}</p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">
                  {product.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="h-1 w-1 rounded-full bg-violet-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {product.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="mt-6 flex gap-2 border-t border-white/10 pt-4">
                  <LinkButton
                    size="sm"
                    href={product.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-500 hover:to-blue-500"
                  >
                    <ExternalLink className="mr-2 h-3.5 w-3.5" />
                    Visit
                  </LinkButton>
                  <LinkButton
                    size="sm"
                    variant="outline"
                    href={product.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-white/10"
                  >
                    <GitHubIcon className="mr-2 h-3.5 w-3.5" />
                    GitHub
                  </LinkButton>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
