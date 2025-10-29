<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251029182215 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE customer ALTER id TYPE UUID');
        $this->addSql('COMMENT ON COLUMN customer.id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE rental ALTER id TYPE UUID');
        $this->addSql('ALTER TABLE rental ALTER vhs_id TYPE UUID');
        $this->addSql('ALTER TABLE rental ALTER customer_id TYPE UUID');
        $this->addSql('COMMENT ON COLUMN rental.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN rental.vhs_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN rental.customer_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE vhs ALTER id TYPE UUID');
        $this->addSql('COMMENT ON COLUMN vhs.id IS \'(DC2Type:uuid)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE rental ALTER id TYPE UUID');
        $this->addSql('ALTER TABLE rental ALTER vhs_id TYPE UUID');
        $this->addSql('ALTER TABLE rental ALTER customer_id TYPE UUID');
        $this->addSql('COMMENT ON COLUMN rental.id IS \'(DC2Type:ulid)\'');
        $this->addSql('COMMENT ON COLUMN rental.vhs_id IS \'(DC2Type:ulid)\'');
        $this->addSql('COMMENT ON COLUMN rental.customer_id IS \'(DC2Type:ulid)\'');
        $this->addSql('ALTER TABLE vhs ALTER id TYPE UUID');
        $this->addSql('COMMENT ON COLUMN vhs.id IS \'(DC2Type:ulid)\'');
        $this->addSql('ALTER TABLE customer ALTER id TYPE UUID');
        $this->addSql('COMMENT ON COLUMN customer.id IS \'(DC2Type:ulid)\'');
    }
}
