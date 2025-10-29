<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251029172815 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE rental (id UUID NOT NULL, vhs_id UUID NOT NULL, customer_id UUID NOT NULL, rented_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, due_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, returned_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_1619C27D257160A3 ON rental (vhs_id)');
        $this->addSql('CREATE INDEX IDX_1619C27D9395C3F3 ON rental (customer_id)');
        $this->addSql('COMMENT ON COLUMN rental.id IS \'(DC2Type:ulid)\'');
        $this->addSql('COMMENT ON COLUMN rental.vhs_id IS \'(DC2Type:ulid)\'');
        $this->addSql('COMMENT ON COLUMN rental.customer_id IS \'(DC2Type:ulid)\'');
        $this->addSql('COMMENT ON COLUMN rental.rented_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN rental.due_date IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN rental.returned_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE rental ADD CONSTRAINT FK_1619C27D257160A3 FOREIGN KEY (vhs_id) REFERENCES vhs (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE rental ADD CONSTRAINT FK_1619C27D9395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE rental DROP CONSTRAINT FK_1619C27D257160A3');
        $this->addSql('ALTER TABLE rental DROP CONSTRAINT FK_1619C27D9395C3F3');
        $this->addSql('DROP TABLE rental');
    }
}
